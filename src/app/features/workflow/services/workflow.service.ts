import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Workflow } from '../models/workflow.model';

@Injectable({ providedIn: 'root' })
export class WorkflowService {

  private workflowsSubject = new BehaviorSubject<Workflow[]>([]);
  workflows$ = this.workflowsSubject.asObservable();

  create(workflow: Workflow) {
    this.workflowsSubject.next([
      ...this.workflowsSubject.value,
      workflow
    ]);
  }

  update(updated: Workflow) {
    this.workflowsSubject.next(
      this.workflowsSubject.value.map(w =>
        w.id === updated.id ? updated : w
      )
    );
  }

  delete(id: number) {
    this.workflowsSubject.next(
      this.workflowsSubject.value.filter(w => w.id !== id)
    );
  }

  isNameTaken(name: string): Observable<boolean> {
    return of(this.workflowsSubject.value).pipe(
      delay(500),
      map(list => list.some(w => w.name === name))
    );
  }
}
