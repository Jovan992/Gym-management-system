import { Component, OnInit } from '@angular/core';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { MembersService } from 'src/app/services/members.service';
import { MembershipService } from 'src/app/services/membership.service';
import { StaffService } from 'src/app/services/staff.service';
import { ChartConfiguration } from 'chart.js';
import { Members } from 'src/app/models/members.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Members card
  members: Members[];
  membersNumber: number;

  // Memberships card
  membershipTypes: string[] = [];
  membershipTypesNumber: number;

  // Staff card
  staff: [];
  staffNumber: number;

  // Classes card
  classes: [];
  classesNumber: number;

  // Doughnut
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: [], label: 'Membership Types',
      backgroundColor: [
        'rgb(254, 225, 1)',
        'rgb(167, 167, 173)',
        'rgb(167, 112, 68)',
        'rgb(107, 172, 102)',
        'rgb(62, 124, 178)',
        'rgb(191, 68, 72)',
        'rgb(249, 146, 70)',
      ]
    },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  constructor(
    private _membersService: MembersService,
    private _membershipService: MembershipService,
    private _staffService: StaffService,
    private _classService: ClassScheduleService,
  ) {

  }

  ngOnInit(): void {
    this.viewMembers();
    this.viewMemberships();
    this.viewStaff();
    this.viewClasses();
  }

  /**
   * Get info about members array from database
   */
  viewMembers() {
    this._membersService.getMembers().subscribe({
      next: (members) => {
        this.members = members as Members[];
        this.membersNumber = members.length;
      },
      error: () => { },
    });
  }

  /**
   * Get info about membership array from database
   */
  viewMemberships() {
    this._membershipService.getMemberships().subscribe({
      next: (memberships) => {
        memberships.forEach((element, index) => {
          this.membershipTypes.push(element.membershipName);
        });
        this.membershipTypesNumber = this.membershipTypes.length;
        for (let i = 0; i < this.membershipTypes.length; i++) {
          var count = this.members.filter((obj) => obj.membershipType === this.membershipTypes[i])
          this.doughnutChartDatasets[0].data.push(count.length)
        }
      },
      error: () => { },
    });
  }

  /**
   * Get info about staff array from database
   */
  viewStaff() {
    this._staffService.getStaff().subscribe({
      next: (staff) => {
        this.staff = staff as [];
        this.staffNumber = this.staff.length;
      },
      error: () => { },
    });
  }

  /**
   * Get info about staff array from database
   */
  viewClasses() {
    this._classService.getClassSchedule().subscribe({
      next: (scheduledClass) => {
        this.classes = scheduledClass as [];
        this.classesNumber = this.classes.length;
      },
      error: () => { },
    });
  }
}
