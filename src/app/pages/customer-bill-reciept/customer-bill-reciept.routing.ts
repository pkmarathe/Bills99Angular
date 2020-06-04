import { Routes, RouterModule } from '@angular/router';
import { CustomerBillRecieptComponent } from './customer-bill-reciept.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CustomerBillRecieptComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);  
