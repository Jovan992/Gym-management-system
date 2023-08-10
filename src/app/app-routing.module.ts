import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './components/staff/staff.component';
import { MembershipComponent } from './components/membership/membership.component';
import { ClassScheduleComponent } from './components/class-schedule/class-schedule.component';
import { MembersComponent } from './components/members/members.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NutritionScheduleComponent } from './components/nutrition-schedule/nutrition-schedule.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { isUserLoggedInGuard } from './shared/guard/loggedin.guard';
import { isUserLoggedOutGuard } from './shared/guard/loggedout.guard';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { AccountantComponent } from './components/accountant/accountant.component';
import { GroupsComponent } from './components/groups/groups.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isUserLoggedOutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isUserLoggedOutGuard],
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'membership',
    component: MembershipComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'class-schedule',
    component: ClassScheduleComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'reservations',
    component: ReservationListComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'nutrition-schedule',
    component: NutritionScheduleComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'accountant',
    component: AccountantComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'group',
    component: GroupsComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'newsletter',
    component: NewsletterComponent,
    canActivate: [isUserLoggedInGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isUserLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
