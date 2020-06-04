import { Routes, RouterModule } from '@angular/router';
import { TaxMasterComponent } from './tax-master/tax-master.component';
import { ConfigurationComponent } from './configuration.component';
import { CurrencyMasterComponent } from './currency-master/currency-master.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ConfigurationComponent,
        children: [
            { path: '', redirectTo: 'tax-master', pathMatch: 'full' },
            { path: 'tax-master', component: TaxMasterComponent }, 
            { path: 'currency-master', component: CurrencyMasterComponent }, 
            { path: 'subscription-plan', component: SubscriptionPlanComponent }, 
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
