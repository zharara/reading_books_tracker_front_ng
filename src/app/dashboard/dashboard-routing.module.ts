import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';


export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: 'books',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
