import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduledClass } from '../models/scheduled.class';
import { Members } from '../models/members.model';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class ClassScheduleService {
  classEvents: {}[] = [];
  classes: ScheduledClass[] = [];

  constructor(
    private _httpClient: HttpClient,
  ) { }

  /** 
   * Get class schedule from database
   */
  getClassSchedule() {
    return this._httpClient.get("http://localhost:3000/classSchedule");
  }

  /** 
   * Add class to schedule in database
   */
  addClass(theClass: ScheduledClass) {
    return this._httpClient.post("http://localhost:3000/classSchedule", theClass);
  }

  /** 
   * Delete class from schedule in database
   */
  deleteClass(classId: number) {
    return this._httpClient.delete("http://localhost:3000/classSchedule/" + classId);
  }

  /** 
   * Edit class in schedule in database
   */
  editClass(id: number, data: any) {
    return this._httpClient.put(`http://localhost:3000/classSchedule/${id}`, data);
  }

  /**
   * Map class to array event and pushes it in classEvents array
   */
  mapClass(dbClass: ScheduledClass) {
    var obj = {
      id: dbClass.id.toString(),
      start: dbClass.date.toString().replace(/T.*$/, '') + "T" + dbClass.start,
      end: dbClass.date.toString().replace(/T.*$/, '') + "T" + dbClass.end,
      title: dbClass.name
    };
    this.classEvents.push(obj);
  }

  /**
     * Removes deleted group from class if it's listed in class groups
     * @param id Id of the deleted group
     */
  removeGroupFromClass(id: number) {
    this.getClassSchedule().subscribe({
      next: (data) => {
        this.classes = data as ScheduledClass[];

        this.classes.forEach(element => {
          if (element.groups) {
            element.groups.forEach(group => {
              if (group.id == id) {
                let index = element.groups!.findIndex(x => x.id == id);
                element.groups!.splice(index, 1);
                this.editClass(element.id, element).subscribe({
                  next: () => { },
                  error: () => { }
                })
              }
            })
          }
        })
      },
      error: (err) => { },
    });
  }

  /**
    * Removes deleted member from class if it's listed in class participants
    * @param id Id of the deleted member
    */
  removeMemberFromClass(id: number) {
    this.getClassSchedule().subscribe({
      next: (data) => {
        this.classes = data as ScheduledClass[];

        this.classes.forEach(element => {
          if (element.participants) {
            element.participants.forEach(mem => {
              if (mem.id == id) {
                let index = element.participants!.findIndex(x => x.id == id);
                element.participants!.splice(index, 1);
                this.editClass(element.id, element).subscribe({
                  next: () => { },
                  error: () => { }
                })
              }
            })
          }
        })
      },
      error: (err) => { },
    });
  }

  /**
    * Updates edited member in class if it's listed in class participants
    * @param id Id of the edited member
    */
  editMemberInClass(member: Members) {
    this.getClassSchedule().subscribe({
      next: (data) => {
        this.classes = data as ScheduledClass[];

        this.classes.forEach(element => {
          if (element.participants) {
            element.participants.forEach(mem => {
              if (mem.id === member.id) {
                let index = element.participants!.findIndex(x => x.id == member.id);
                element.participants![index] = member;
                this.editClass(element.id, element).subscribe({
                  next: () => { },
                  error: () => { }
                })
              }
            })
          }
        })
      },
      error: (err) => { },
    });
  }

  /**
    * Updates edited group in class if it's listed in class groups
    * @param id Id of the edited group
    */
  editGroupInClass(gr: Group) {
    this.getClassSchedule().subscribe({
      next: (data) => {
        this.classes = data as ScheduledClass[];

        this.classes.forEach(element => {
          if (element.groups) {
            element.groups.forEach(mem => {
              if (mem.id === gr.id) {
                let index = element.groups!.findIndex(x => x.id == gr.id);
                element.groups![index] = gr;
                this.editClass(element.id, element).subscribe({
                  next: () => { },
                  error: () => { }
                })
              }
            })
          }
        })
      },
      error: (err) => { },
    });
  }
}
