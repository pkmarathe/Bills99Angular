import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list.component';

const childRoutes: Routes = [
    {
        path: '',
        component: CustomerListComponent
    }
];

export const routing = RouterModule.forChild(childRoutes); 
