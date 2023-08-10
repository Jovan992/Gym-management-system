import { Injectable } from '@angular/core';
import { Members } from '../models/members.model';
import { HttpClient } from '@angular/common/http';
import { MembershipService } from './membership.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(
    private http: HttpClient,
    private membershipService: MembershipService
  ) {}

  /**
   * Gets all Members from the database
   * @returns Members object array from the database
   */
  getMembers() {
    return this.http.get<Members[]>('http://localhost:3000/members');
  }

  /**
   * Deletes member object from the database
   * @param id Id of the member object that gets deleted from the database
   * @returns deleted member object
   */
  deleteMember(id: number) {
    return this.http.delete(`http://localhost:3000/members/${id}`);
  }

  /**
   * Adds member to the database
   * @param data Members object that gets added
   * @returns Members object added to the database
   */
  addMember(data: Members) {
    return this.http.post(`http://localhost:3000/members`, data);
  }

  /**
   * Edits the member object in the database
   * @param id Id of the member object that gets edited
   * @param data Member object for editing
   * @returns Edited member object
   */
  editMember(id: number, data: Members) {
    return this.http.put(`http://localhost:3000/members/${id}`, data);
  }
  /**
   * Gets all membership types from data base and saves them to the array
   * @param membershipTypes array of all memberships
   */
  getMembershipTypes(membershipTypes: string[]) {
    this.membershipService.getMemberships().subscribe({
      next: (val) => {
        val.forEach((membership) => {
          membershipTypes.push(membership.membershipName);
        });
      },
      error: (err) => {},
    });
  }
}
