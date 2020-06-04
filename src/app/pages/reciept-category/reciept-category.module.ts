import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './reciept-category.routing';
import { SharedModule } from '../../shared/shared.module';
import { RecieptCategoryComponent } from './reciept-category.component';
import { ManageRecieptSampleComponent } from './manage-reciept-sample/manage-reciept-sample.component';
import { CategoryService } from '../../../app/shared/services/category.service';  
import { CKEditorModule } from 'ng2-ckeditor';
import { ModalModule } from 'ngx-modal';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,CKEditorModule,ModalModule
    ],
    declarations: [
        RecieptCategoryComponent,ManageRecieptSampleComponent
    ],
    providers:[CategoryService]
})
export class RecieptCategoryModule { } 
