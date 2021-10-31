import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';

import { ShellComponent } from './shell/shell.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PlansComponent } from './components/plans/plans.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { ProfilesComponent } from './components/profiles/profiles.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'plans',
        component: PlansComponent
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent
      },
      {
        path: 'profiles',
        component: ProfilesComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsManagementRoutingModule { }
