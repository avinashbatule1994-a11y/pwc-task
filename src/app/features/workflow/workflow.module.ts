import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { WorkflowRoutingModule } from './workflow-routing.module';

import { WorkflowListComponent } from './pages/workflow-list/workflow-list.component';
import { WorkflowFormComponent } from './pages/workflow-form/workflow-form.component';
import { ApproveWorkflowComponent } from './pages/approve-workflow/approve-workflow.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WorkflowListComponent,
    WorkflowFormComponent,
    ApproveWorkflowComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    WorkflowRoutingModule,
    
    
  ]
})
export class WorkflowModule {}
