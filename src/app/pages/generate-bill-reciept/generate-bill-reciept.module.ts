import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe, LowerCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './generate-bill-reciept.routing';
import { SharedModule } from '../../shared/shared.module'; 
import { GenerateBillRecieptComponent } from './generate-bill-reciept.component';
import { GenerateRecieptPdfComponent } from './generate-reciept-pdf/generate-reciept-pdf.component';
import { CategoryService } from '../../../app/shared/services/category.service';
import { BillRecieptService } from '../../../app/shared/services/bill-reciept.service';  
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars'; 
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';   
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule} from 'agm-direction'; // agm-direction
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,DateTimePickerModule,Ng4LoadingSpinnerModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDwRZHa0qDJS3dt-HYIf8h_t1jK-TycAco'
          }),
          AgmDirectionModule
    ],
    declarations: [
        GenerateBillRecieptComponent,GenerateRecieptPdfComponent
    ],
    providers:[DatePipe,LowerCasePipe,CategoryService,BillRecieptService],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GenerateBillRecieptModule { } 
