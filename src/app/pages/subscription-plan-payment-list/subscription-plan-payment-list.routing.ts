import { Routes, RouterModule } from '@angular/router';
import { SubscriptionPlanPaymentListComponent } from './subscription-plan-payment-list.component';

const childRoutes: Routes = [
    {
        path: '',
        component: SubscriptionPlanPaymentListComponent
    }
];

export const routing = RouterModule.forChild(childRoutes); 
