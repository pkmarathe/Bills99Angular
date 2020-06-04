import { Routes, RouterModule } from '@angular/router';
import { RecieptCategoryComponent } from './reciept-category.component';
import { ManageRecieptSampleComponent } from './manage-reciept-sample/manage-reciept-sample.component';

const childRoutes: Routes = [
    {
        path: '',
        component: RecieptCategoryComponent, 
    },
    {
        path: 'category-reciept-sample',component: ManageRecieptSampleComponent,  
    }
];

export const routing = RouterModule.forChild(childRoutes); 
