import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowListComponent } from './pages/workflow-list/workflow-list.component';
import { ApproveWorkflowComponent } from './pages/approve-workflow/approve-workflow.component';


@NgModule({
  declarations: [
    WorkflowListComponent,
    ApproveWorkflowComponent
  ],
  imports: [
    CommonModule,
    WorkflowRoutingModule
  ]
})
export class WorkflowModule { }
