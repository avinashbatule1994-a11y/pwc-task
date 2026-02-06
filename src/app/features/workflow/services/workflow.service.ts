
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
    dueDate: '2026-02-05T00:00:00.000Z',
    createdAt: '2026-01-25T00:00:00.000Z',
    assignedUsers: ['manager@test.com']
  },
  {
    id: 2,
    name: 'Vendor Onboarding',
    status: 'Approved',
    priority: 'Medium',
    dueDate: '2026-01-20T00:00:00.000Z',
    createdAt: '2026-01-10T00:00:00.000Z',
    completedAt: '2026-01-18T00:00:00.000Z',
    assignedUsers: ['admin@test.com']
  },
  {
    id: 3,
    name: 'Contract Review',
    status: 'Approved',
    priority: 'Low',
    dueDate: '2026-02-01T00:00:00.000Z',
    createdAt: '2026-01-12T00:00:00.000Z',
    completedAt: '2026-01-15T00:00:00.000Z',
    assignedUsers: ['legal@test.com']
  },
  {
    id: 4,
    name: 'Policy Update',
    status: 'Draft',
    priority: 'Medium',
    dueDate: '2026-02-10T00:00:00.000Z',
    createdAt: '2026-01-28T00:00:00.000Z',
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
  };
  pending(id: number) {
    const updated: Workflow[] = this.workflowsSubject.value.map(w =>
      w.id === id
        ? { ...w, status: 'In Review' }
        : w
    );
    this.persist(updated);
  }
  draft(id: number) {
    const updated: Workflow[] = this.workflowsSubject.value.map(w =>
      w.id === id
        ? { ...w, status: 'Draft' }
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

