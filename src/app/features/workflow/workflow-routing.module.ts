import { NgModule } from '@angular/core';
import { WorkflowListComponent } from './pages/workflow-list/workflow-list.component';
import { WorkflowFormComponent } from './pages/workflow-form/workflow-form.component';
import { ApproveWorkflowComponent } from './pages/approve-workflow/approve-workflow.component';
import { RoleGuard } from '../../core/guards/role.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: WorkflowListComponent },
  { path: 'create', component: WorkflowFormComponent },
  {
    path: 'approve',
    component: ApproveWorkflowComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN,MANAGER'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule {}
