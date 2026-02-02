// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { delay, map } from 'rxjs/operators';
// import { Workflow } from '../models/workflow.model';

// @Injectable({ providedIn: 'root' })
// export class WorkflowService {

//   private workflowsSubject = new BehaviorSubject<Workflow[]>([]);
//   workflows$ = this.workflowsSubject.asObservable();

//   create(workflow: Workflow) {
//     this.workflowsSubject.next([
//       ...this.workflowsSubject.value,
//       workflow
//     ]);
//   }

//   update(updated: Workflow) {
//     this.workflowsSubject.next(
//       this.workflowsSubject.value.map(w =>
//         w.id === updated.id ? updated : w
//       )
//     );
//   }

//   delete(id: number) {
//     this.workflowsSubject.next(
//       this.workflowsSubject.value.filter(w => w.id !== id)
//     );
//   }

//   isNameTaken(name: string): Observable<boolean> {
//     return of(this.workflowsSubject.value).pipe(
//       delay(500),
//       map(list => list.some(w => w.name === name))
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Workflow, WorkflowStatus } from '../models/workflow.model';

const DUMMY_WORKFLOWS: Workflow[] = [
  {
    id: 1,
    name: 'Invoice Approval',
    status: 'In Review',
    priority: 'High',
    dueDate: '2026-02-05',
    createdAt: '2026-01-25',
    assignedUsers: ['manager@test.com']
  },
  {
    id: 2,
    name: 'Vendor Onboarding',
    status: 'Approved',
    priority: 'Medium',
    dueDate: '2026-01-20',
    createdAt: '2026-01-10',
    completedAt: '2026-01-18',
    assignedUsers: ['admin@test.com']
  }
];

@Injectable({ providedIn: 'root' })
export class WorkflowService {

  private workflowsSubject = new BehaviorSubject<Workflow[]>(
    JSON.parse(localStorage.getItem('workflows') || 'null') ?? DUMMY_WORKFLOWS
  );

  workflows$ = this.workflowsSubject.asObservable();

  private persist(data: Workflow[]) {
    localStorage.setItem('workflows', JSON.stringify(data));
    this.workflowsSubject.next(data);
  }

  create(workflow: Workflow) {
    this.persist([...this.workflowsSubject.value, workflow]);
  }

  delete(id: number) {
    this.persist(this.workflowsSubject.value.filter(w => w.id !== id));
  }

  approve(id: number) {
    const updated: Workflow[] = this.workflowsSubject.value.map(w =>
      w.id === id
        ? {
            ...w,
            status: 'Approved',
            completedAt: new Date().toISOString()
          }
        : w
    );
    this.persist(updated);
  }

  reject(id: number) {
    const updated: Workflow[] = this.workflowsSubject.value.map(w =>
      w.id === id
        ? { ...w, status: 'Rejected' }
        : w
    );
    this.persist(updated);
  }

  isNameTaken(name: string): Observable<boolean> {
    return of(this.workflowsSubject.value).pipe(
      delay(400),
      map(list => list.some(w => w.name === name))
    );
  }
}
