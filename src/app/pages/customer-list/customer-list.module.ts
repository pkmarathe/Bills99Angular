import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './customer-list.routing';
import { SharedModule } from '../../shared/shared.module';
import { CustomerListComponent } from './customer-list.component'; 
import { RegistrationService } from '../../../app/shared/services/registration.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner'; 
import { ModalModule } from 'ngx-modal';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,ModalModule,
        routing,Ng4LoadingSpinnerModule.forRoot() 
    ],
    declarations: [
        CustomerListComponent 
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerListModule { } 
