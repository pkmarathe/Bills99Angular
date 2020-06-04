import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './configuration.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

/* components */
import { ConfigurationComponent } from './configuration.component';
import { TaxMasterComponent } from './tax-master/tax-master.component';
import { CurrencyMasterComponent } from './currency-master/currency-master.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { MasterService } from '../../../app/shared/services/master.service';
//import { LocalStorageService } from 'src/app/shared/services/common/localstorage.service';

@NgModule({
    imports: [
        NgxPaginationModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        ConfigurationComponent,
        TaxMasterComponent,CurrencyMasterComponent,SubscriptionPlanComponent
    ],
    providers:[MasterService]
})
export class ConfigurationModule { }
