import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MembershipComponent } from './components/membership/membership.component';
import { MembershipDialogComponent } from './components/dialogs/membership-dialog/membership-dialog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { StaffComponent } from './components/staff/staff.component';
import { StaffDialogComponent } from './components/dialogs/staff-dialog/staff-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { ClassScheduleComponent } from './components/class-schedule/class-schedule.component';
import { ClassScheduleDialogComponent } from './components/dialogs/class-schedule-dialog/class-schedule-dialog.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MembersComponent } from './components/members/members.component';
import { MemberDialogComponent } from './components/dialogs/member-dialog/member-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NutritionScheduleComponent } from './components/nutrition-schedule/nutrition-schedule.component';
import { NutritionScheduleDialogComponent } from './components/dialogs/nutrition-schedule-dialog/nutrition-schedule-dialog.component';
import { NutritionCalendarComponent } from './components/dialogs/nutrition-schedule-dialog/nutrition-calendar/nutrition-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddEventDialogComponent } from './components/dialogs/add-event-dialog/add-event-dialog.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationDialogComponent } from './components/dialogs/reservation-dialog/reservation-dialog.component';
import { AccountantComponent } from './components/accountant/accountant.component';
import { AccountantDialogComponent } from './components/dialogs/accountant-dialog/accountant-dialog.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupsDialogComponent } from './components/dialogs/groups-dialog/groups-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ScheduleCalendarDialogComponent } from './components/dialogs/schedule-calendar-dialog/schedule-calendar-dialog.component';
import { ClassScheduleCalendarEventComponent } from './components/dialogs/schedule-calendar-dialog/class-schedule-calendar-event/class-schedule-calendar-event.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ShortPipe } from './shared/pipshort';
import { NewsletterDialogComponent } from './components/dialogs/newsletter-dialog/newsletter-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    StaffComponent,
    StaffDialogComponent,
    MembershipComponent,
    MembershipDialogComponent,
    DeleteDialogComponent,
    ClassScheduleComponent,
    ClassScheduleDialogComponent,
    MembersComponent,
    MemberDialogComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NutritionScheduleComponent,
    NutritionScheduleDialogComponent,
    NutritionCalendarComponent,
    AddEventDialogComponent,
    ReservationListComponent,
    ReservationDialogComponent,
    AccountantComponent,
    AccountantDialogComponent,
    GroupsComponent,
    GroupsDialogComponent,
    DashboardComponent,
    NewsletterComponent,
    ShortPipe,
    NewsletterDialogComponent,
    ScheduleCalendarDialogComponent,
    ClassScheduleCalendarEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    FullCalendarModule,
    NgChartsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
