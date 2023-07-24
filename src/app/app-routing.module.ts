import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { AdminComponent } from './admin/admin.component';
import { AddExamSlotComponent } from './add-exam-slot/add-exam-slot.component';
import { LandingComponent } from './landing/landing.component';
import { RegisteredExamsComponent } from './registered-exams/registered-exams.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { MapComponent } from './volunteer/map/map.component';

const routes: Routes = [
  { path: '', redirectTo:'landing', pathMatch: 'full' },
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'add-exam-slot', component: AddExamSlotComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'reg-exams', component: RegisteredExamsComponent },
  { path: 'login/:isAdmin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

