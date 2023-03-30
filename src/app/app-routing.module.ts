import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
  
    children: [
      { path: '', redirectTo: '/dashboard/books/list', pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
