import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './customer-bill-reciept.routing';
import { SharedModule } from '../../shared/shared.module';
import { CustomerBillRecieptComponent } from './customer-bill-reciept.component';
import { CategoryService } from '../../../app/shared/services/category.service';
import { BillRecieptService } from '../../../app/shared/services/bill-reciept.service';
import { DateTimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';   
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,DateTimePickerModule,DatePickerModule,Ng4LoadingSpinnerModule.forRoot()
    ],
    declarations: [
        CustomerBillRecieptComponent
    ],
    providers:[DatePipe,CategoryService,BillRecieptService], 
})
export class CustomerBillRecieptModule { } 
