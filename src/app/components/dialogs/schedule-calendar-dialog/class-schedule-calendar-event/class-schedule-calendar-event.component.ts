import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/models/group';
import { Members } from 'src/app/models/members.model';
import { ScheduledClass } from 'src/app/models/scheduled.class';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { GroupsService } from 'src/app/services/groups.service';
import { MembersService } from 'src/app/services/members.service';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';

@Component({
  selector: 'app-class-schedule-calendar-event',
  templateUrl: './class-schedule-calendar-event.component.html',
  styleUrls: ['./class-schedule-calendar-event.component.css']
})
export class ClassScheduleCalendarEventComponent implements OnInit {

  classes: ScheduledClass[] = [];
  currentClass: ScheduledClass = {
    id: 0,
    name: '',
    trainer: '',
    location: '',
    start: {
      hours: 0,
      minutes: 0
    },
    end: {
      hours: 0,
      minutes: 0
    },
    date: '',
    participants: [],
    groups: []
  }
  openMembers: Members[] = [];
  groupMembers: Members[] = [];
  nonSelectedMembers: Members[] = [];
  selectedMembers: Members[] = [];
  openGroups: Group[] = [];
  selectedGroups: Group[] = [];

  constructor(
    private _membersService: MembersService,
    private _classService: ClassScheduleService,
    private _groupsService: GroupsService,
    private _snackBar: MessageSnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getClasses();
    this.getGroupMembers();
  }

  /**
   * Drag and drop method in class schedule calendar for members
   * @param event : drag and drop event
   */
  dropMember(event: CdkDragDrop<Members[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  /**
   * Drag and drop method in class schedule calendar for groups
   * @param event : drag and drop event
   */
  dropGroup(event: CdkDragDrop<Group[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  /**
   * Get scheduled classes from database and retreive class with details and selected participants
   */
  getClasses() {
    this._classService.getClassSchedule().subscribe({
      next: (classes) => {
        this.classes = classes as ScheduledClass[];

        var exist = this.classes.find(x => x.id == this.data.event.id)
        if (exist) {
          this.currentClass = exist;
          if (exist.participants) this.selectedMembers = exist.participants;
          if (exist.groups) this.selectedGroups = exist.groups;

          this.getOpenGroups(this.selectedGroups);
          this.getOpenMembers(this.selectedMembers);
        }
      }
    });
  }

  /**
   * Get groups that are not assigned to this class
   * @param selectedGr : list of selected groups
   */
  getOpenGroups(selectedGr: Group[]) {
    this._groupsService.getGroups().subscribe({
      next: (data) => {
        this.openGroups = data.filter((group) =>
          selectedGr.every((selectedGroup) => selectedGroup.id !== group.id));
      }
    });
  }

  /**
   * gets all members assigned to any of groups
   */
  getGroupMembers() {
    this.groupMembers = [];
    this._groupsService.getGroups().subscribe({
      next: (data) => {
        data.forEach((group) => {
          group.assignedMembers.forEach((assMember) =>
            this.groupMembers.push(assMember)
          );
        });
      },
      error: (err) => { },
    });
  }


  /**
   * Get members that are not assigned to this class or groups
   * @param selected : list of selected participants
   */
  getOpenMembers(selected: Members[]) {
    this._membersService.getMembers().subscribe({
      next: (data) => {
        this.nonSelectedMembers = data.filter((member) =>
          selected.every((dataMember) => dataMember.id !== member.id));
        this.openMembers = this.nonSelectedMembers.filter((member) =>
          this.groupMembers.every((nonSelectedMember) => nonSelectedMember.id !== member.id));
      }
    });
  }


  /**
   * Updates list of class participants/groups, edits class in database via classService and shows updated snackBar message
   */
  saveEvent() {
    this.currentClass.participants = this.selectedMembers;
    this.currentClass.groups = this.selectedGroups;
    this._classService.editClass(this.data.event.id, this.currentClass).subscribe({
      next: () => {
        this._snackBar.openSnackBar(snackMessages.edited);
      },
      error: () => { }
    });
  }
}
