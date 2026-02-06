import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  },
{
  path: '',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./features/dashboard/dashboard.module')
          .then(m => m.DashboardModule)
    },
    {
      path: 'workflows',
      loadChildren: () =>
        import('./features/workflow/workflow.module')
          .then(m => m.WorkflowModule)
    }
  ]
}
,
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


