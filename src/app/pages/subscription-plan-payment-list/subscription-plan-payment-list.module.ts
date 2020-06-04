import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './subscription-plan-payment-list.routing';
import { SharedModule } from '../../shared/shared.module';
import { SubscriptionPlanPaymentListComponent } from './subscription-plan-payment-list.component';  
import { ModalModule } from 'ngx-modal';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';  
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,ModalModule,Ng4LoadingSpinnerModule.forRoot()
    ],
    declarations: [
        SubscriptionPlanPaymentListComponent 
    ]
})
export class SubscriptionPlanPaymentListModule { } 
