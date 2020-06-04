import { Routes, RouterModule } from '@angular/router';
//import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'subscription-detail',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'subscription-detail'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
