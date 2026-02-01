import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

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
    path: 'workflows',
    loadChildren: () =>
      import('./features/workflow/workflow.module')
        .then(m => m.WorkflowModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'workflows',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
