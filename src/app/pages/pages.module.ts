import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../shared/services/common/localstorage.service';
import { RegistrationService } from '../shared/services/registration.service';
import { NotificationService } from '../shared/services/common/notification.service';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { ModalModule } from 'ngx-modal';
import { SubscriptionPlanPayService } from '../shared/services/subscription-plan-pay.service';
import { MasterService } from '../shared/services/master.service';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { RegistrationComponent } from './subscription-detail/registration/registration.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { StripepaymentComponent } from './stripepayment/stripepayment.component';   
@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,        
        FormsModule,
        routing,
        NgxPaginationModule,ModalModule,Ng4LoadingSpinnerModule.forRoot()
    ],
    declarations: [
        PagesComponent,
        LoginComponent,SubscriptionDetailComponent, RegistrationComponent, StripepaymentComponent
    ],
    providers:[LocalStorageService, RegistrationService,NotificationService,SubscriptionPlanPayService,MasterService],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule { }
