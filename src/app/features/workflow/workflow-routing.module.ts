import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowListComponent } from './pages/workflow-list/workflow-list.component';
import { ApproveWorkflowComponent } from './pages/approve-workflow/approve-workflow.component';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: WorkflowListComponent
  },
  {
    path: 'approve',
    component: ApproveWorkflowComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'MANAGER'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule {}
