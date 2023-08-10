import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  /**
   * Gets all Groups from the database
   * @returns Group object array from the database
   */
  getGroups() {
    return this.http.get<Group[]>('http://localhost:3000/groups');
  }

  /**
   * Removes member assigned to the group that is deleted from members database
   * @param id Id of the deleted member
   */
  removeMemberInTheGroup(id: number) {
    this.getGroups().subscribe({
      next: (value) => {
        const groupWithMember = value.find((group) =>
          group.assignedMembers.find((member) => member.id === id)
        );
        if (!groupWithMember) return;
        if (groupWithMember.assignedMembers.length > 2) {
          const groupWithoutMemberAssigned =
            groupWithMember.assignedMembers.filter(
              (member) => member.id !== id
            );
          groupWithMember.assignedMembers = groupWithoutMemberAssigned;
          this.editGroup(groupWithMember.id, groupWithMember).subscribe({
            next: (value) => {},
            error: (err) => {},
          });
        } else {
          this.deleteGroup(groupWithMember.id).subscribe({
            next: (val) => {},
            error: (err) => {},
          });
        }
      },
      error: (err) => {},
    });
  }

  /**
   * Adds group to the database
   * @param data Group object that gets added
   * @returns Group object added to the database
   */

  addGroup(data: Group) {
    return this.http.post(`http://localhost:3000/groups`, data);
  }

  /**
   * Edits the group object in the database
   * @param id Id of the group object that gets edited
   * @param data Group object for editing
   * @returns Group member object
   */
  editGroup(id: number, data: Group) {
    return this.http.put(`http://localhost:3000/groups/${id}`, data);
  }

  /**
   * Deletes group object from the database
   * @param id Id of the group object that gets deleted from the database
   * @returns deleted group object
   */
  deleteGroup(id: number) {
    return this.http.delete(`http://localhost:3000/groups/${id}`);
  }
}
