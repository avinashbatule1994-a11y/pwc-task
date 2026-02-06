// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import {
//   FormBuilder,
//   Validators,
//   AbstractControl,
//   AsyncValidatorFn,
//   NonNullableFormBuilder
// } from '@angular/forms';
// import { map } from 'rxjs/operators';
// import { WorkflowService } from '../../services/workflow.service';

// @Component({
//   selector: 'app-workflow-form',
//   templateUrl: './workflow-form.component.html',
//   styleUrls: ['./workflow-form.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class WorkflowFormComponent {

//   form = this.fb.group({
//     name: [
//       '',
//       [Validators.required, Validators.minLength(3)],
//       [this.uniqueNameValidator()]
//     ],
//     priority: ['Medium', Validators.required],
//     dueDate: ['', Validators.required],
//     assignedUsers: [[]]
//   });

//  constructor(
//   private fb: NonNullableFormBuilder,
//   private workflowService: WorkflowService
// ) {}


//   submit() {
//     if (this.form.invalid) return;

//     this.workflowService.create({
//       id: Date.now(),
//       status: 'Draft',
//       createdAt: new Date(),
//       ...this.form.value
//     });
//   }

//   private uniqueNameValidator(): AsyncValidatorFn {
//     return (control: AbstractControl) =>
//       this.workflowService.isNameTaken(control.value).pipe(
//         map(taken => (taken ? { nameTaken: true } : null))
//       );
//   }
// }

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { map } from 'rxjs/operators';
import { WorkflowService } from '../../services/workflow.service';
import { Workflow } from '../../models/workflow.model';
import { AbstractControl, AsyncValidatorFn, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-workflow-form',
  templateUrl: './workflow-form.component.html',
  styleUrls: ['./workflow-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowFormComponent {

form = this.fb.group({
  name: this.fb.control('', {
    validators: [Validators.required, Validators.minLength(3)],
    asyncValidators: [this.uniqueNameValidator()]
  }),
  priority: this.fb.control<'Low' | 'Medium' | 'High'>(
    'Medium',
    Validators.required
  ),
  dueDate: this.fb.control('', Validators.required),
  assignedUsers: this.fb.control<string[]>([])
});


 constructor(
  private fb: NonNullableFormBuilder,
  private workflowService: WorkflowService
) {}

submit() {
  if (this.form.invalid) return;

  const value = this.form.getRawValue();

  const workflow: Workflow = {
    id: Date.now(),
    name: value.name,
    priority: value.priority,
    dueDate: new Date(value.dueDate).toISOString(),   // ✅ FIX
    assignedUsers: value.assignedUsers,
    status: 'Draft',
    createdAt: new Date().toISOString()                // ✅ FIX
  };

  console.log('workflow created', workflow);
  this.workflowService.create(workflow);
}

  private uniqueNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) =>
      this.workflowService.isNameTaken(control.value).pipe(
        map(taken => (taken ? { nameTaken: true } : null))
      );
  }
}