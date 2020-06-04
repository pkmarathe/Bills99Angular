import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { RegistrationComponent } from './subscription-detail/registration/registration.component';
import { StripepaymentComponent } from './stripepayment/stripepayment.component';

export const childRoutes: Routes = [
    {
            path: 'subscription-detail',
            component: SubscriptionDetailComponent,
    },
    {
        path: 'registration',
        component: RegistrationComponent,
    },
    {
        path: 'stripepayment',
        component: StripepaymentComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', loadChildren: './index/index.module#IndexModule' },
            { path: 'editor', loadChildren: './editor/editor.module#EditorModule' },
            { path: 'configuration', loadChildren: './configuration/configuration.module#ConfigurationModule' },
            { path: 'subscription-plan-payment', loadChildren: './subscription-plan-payment-list/subscription-plan-payment-list.module#SubscriptionPlanPaymentListModule' },
            { path: 'customer-list', loadChildren: './customer-list/customer-list.module#CustomerListModule' },
            { path: 'reciept-category', loadChildren: './reciept-category/reciept-category.module#RecieptCategoryModule' },
            { path: 'customer-bill-reciept', loadChildren: './customer-bill-reciept/customer-bill-reciept.module#CustomerBillRecieptModule' },
            { path: 'generate-bill-reciept', loadChildren: './generate-bill-reciept/generate-bill-reciept.module#GenerateBillRecieptModule' },
            { path: 'icon', loadChildren: './icon/icon.module#IconModule'},
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'form', loadChildren: './form/form.module#FormModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'ui', loadChildren: './ui/ui.module#UIModule' },
            { path: 'table', loadChildren: './table/table.module#TableModule' },
            { path: 'menu-levels', loadChildren: './menu-levels/menu-levels.module#MenuLevelsModule' },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
