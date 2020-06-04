import { Routes, RouterModule } from '@angular/router';
import { GenerateBillRecieptComponent } from './generate-bill-reciept.component';
import { GenerateRecieptPdfComponent } from './generate-reciept-pdf/generate-reciept-pdf.component';

const childRoutes: Routes = [
    {
        path: '',
        component: GenerateBillRecieptComponent
    },
    {
        path: 'generate-reciept-pdf',component: GenerateRecieptPdfComponent,  
    }
];

export const routing = RouterModule.forChild(childRoutes);  
