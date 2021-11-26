import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';

import { ShellComponent } from './shell/shell.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PlansComponent } from './components/plans/plans.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ServicesComponent } from './components/services/services.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ClaimsComponent } from './components/claims/claims.component';

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
        path: 'services',
        component: ServicesComponent
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent
      },
      {
        path: 'profiles',
        component: ProfilesComponent
      },
      {
        path: 'providers',
        component: ProvidersComponent
      },
      {
        path: 'claims',
        component: ClaimsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsManagementRoutingModule { }
