import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './profile.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ModalsComponent } from '../ui/components/modals/modals.component';
import { ModalModule } from 'ngx-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';  
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ModalModule,
        routing,Ng4LoadingSpinnerModule.forRoot()
    ],
    declarations: [
        ProfileComponent, 
        ModalsComponent
    ]
})
export class ProfileModule { }
