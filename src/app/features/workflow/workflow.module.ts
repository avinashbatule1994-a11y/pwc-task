import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { WorkflowRoutingModule } from './workflow-routing.module';

import { WorkflowListComponent } from './pages/workflow-list/workflow-list.component';
import { WorkflowFormComponent } from './pages/workflow-form/workflow-form.component';
import { ApproveWorkflowComponent } from './pages/approve-workflow/approve-workflow.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'
@NgModule({
  declarations: [
    WorkflowListComponent,
    WorkflowFormComponent,
    ApproveWorkflowComponent,
  ],
  imports: [
    MatTableModule,
    MatChipsModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    SharedModule,
    WorkflowRoutingModule,

    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule



  ]
})
export class WorkflowModule { }
