import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClaimsManagementRoutingModule } from './claims-management-routing.module';
import { ShellComponent } from './shell/shell.component';
import { GlobalHeaderComponent } from './global-header/global-header.component';
import { GlobalMenuComponent } from './global-menu/global-menu.component';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { DataTablesModule } from "angular-datatables";
import { PlansComponent } from './components/plans/plans.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { FinanciersComponent } from './components/financiers/financiers.component';
import { InsuranceIdComponent } from './components/insurance-id/insurance-id.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ViewProfileComponent } from './components/profiles/view-profile/view-profile.component';
import { NewProfileComponent } from './components/profiles/new-profile/new-profile.component';
import { ServicesComponent } from './components/services/services.component';
import { ViewCategoryComponent } from './components/services/view-category/view-category.component';
import { ViewServiceCoverageComponent } from './components/plans/view-service-coverage/view-service-coverage.component';

@NgModule({
  declarations: [
    ShellComponent,
    GlobalHeaderComponent,
    GlobalMenuComponent,
    GlobalFooterComponent,
    SignInComponent,
    PlansComponent,
    SubscriptionsComponent,
    FinanciersComponent,
    InsuranceIdComponent,
    ProfilesComponent,
    ViewProfileComponent,
    NewProfileComponent,
    ServicesComponent,
    ViewCategoryComponent,
    ViewServiceCoverageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClaimsManagementRoutingModule,
    DataTablesModule
  ]
})
export class ClaimsManagementModule { }
