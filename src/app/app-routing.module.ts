import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./features/auth/auth.module').then(m => m.AuthModule)
//   },
//   {
//     path: 'workflows',
//     loadChildren: () =>
//       import('./features/workflow/workflow.module').then(m => m.WorkflowModule)
//   },
//   {
//     path: 'dashboard',
//     loadChildren: () =>
//       import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
//   },
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
// ];
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'workflows',
    loadChildren: () =>
      import('./features/workflow/workflow.module')
        .then(m => m.WorkflowModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


