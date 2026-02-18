
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { delay, map } from 'rxjs/operators';
// import { Workflow, WorkflowStatus } from '../models/workflow.model';

// const DUMMY_WORKFLOWS: Workflow[] = [
//   {
//     id: 1,
//     name: 'Invoice Approval',
//     status: 'In Review',
//     priority: 'High',
//     dueDate: '2026-02-05T00:00:00.000Z',
//     createdAt: '2026-01-25T00:00:00.000Z',
//     assignedUsers: ['manager@test.com']
//   },
//   {
//     id: 2,
//     name: 'Vendor Onboarding',
//     status: 'Approved',
//     priority: 'Medium',
//     dueDate: '2026-01-20T00:00:00.000Z',
//     createdAt: '2026-01-10T00:00:00.000Z',
//     completedAt: '2026-01-18T00:00:00.000Z',
//     assignedUsers: ['admin@test.com']
//   },
//   {
//     id: 3,
//     name: 'Contract Review',
//     status: 'Approved',
//     priority: 'Low',
//     dueDate: '2026-02-01T00:00:00.000Z',
//     createdAt: '2026-01-12T00:00:00.000Z',
//     completedAt: '2026-01-15T00:00:00.000Z',
//     assignedUsers: ['legal@test.com']
//   },
//   {
//     id: 4,
//     name: 'Policy Update',
//     status: 'Draft',
//     priority: 'Medium',
//     dueDate: '2026-02-10T00:00:00.000Z',
//     createdAt: '2026-01-28T00:00:00.000Z',
//     assignedUsers: ['admin@test.com']
//   }
// ];


// @Injectable({ providedIn: 'root' })
// export class WorkflowService {

//   private workflowsSubject = new BehaviorSubject<Workflow[]>(
//     JSON.parse(localStorage.getItem('workflows') || 'null') ?? DUMMY_WORKFLOWS
//   );

//   workflows$ = this.workflowsSubject.asObservable();

//   private persist(data: Workflow[]) {
//     localStorage.setItem('workflows', JSON.stringify(data));
//     this.workflowsSubject.next(data);
//   }

//   create(workflow: Workflow) {
//     this.persist([...this.workflowsSubject.value, workflow]);
//   }

//   delete(id: number) {
//     this.persist(this.workflowsSubject.value.filter(w => w.id !== id));
//   }

//   approve(id: number) {
//     const updated: Workflow[] = this.workflowsSubject.value.map(w =>
//       w.id === id
//         ? {
//             ...w,
//             status: 'Approved',
//             completedAt: new Date().toISOString()
//           }
//         : w
//     );
//     this.persist(updated);
//   }

//   reject(id: number) {
//     const updated: Workflow[] = this.workflowsSubject.value.map(w =>
//       w.id === id
//         ? { ...w, status: 'Rejected' }
//         : w
//     );
//     this.persist(updated);
//   };
//   pending(id: number) {
//     const updated: Workflow[] = this.workflowsSubject.value.map(w =>
//       w.id === id
//         ? { ...w, status: 'In Review' }
//         : w
//     );
//     this.persist(updated);
//   }
//   draft(id: number) {
//     const updated: Workflow[] = this.workflowsSubject.value.map(w =>
//       w.id === id
//         ? { ...w, status: 'Draft' }
//         : w
//     );
//     this.persist(updated);
//   }

//   isNameTaken(name: string): Observable<boolean> {
//     return of(this.workflowsSubject.value).pipe(
//       delay(400),
//       map(list => list.some(w => w.name === name))
//     );
//   }
// }


//////////////////////////////////////////////////////////////////////////////
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { delay, map, tap } from 'rxjs/operators';
// import { Workflow } from '../models/workflow.model';

// @Injectable({ providedIn: 'root' })
// export class WorkflowService {

//   /**
//    * Single source of truth
//    */
//   private workflowsSubject = new BehaviorSubject<Workflow[]>([]);
//   workflows$ = this.workflowsSubject.asObservable();

//   /**
//    * Mock JSON path (Angular serves assets automatically)
//    */
//   private readonly MOCK_URL = 'assets/mock/workflow.json';

//   constructor(private http: HttpClient) {
//     this.init();
//   }

//   /**
//    * Initialize data:
//    * 1. Load from localStorage if exists
//    * 2. Else load from mock JSON
//    */
//   private init(): void {
//     const stored = localStorage.getItem('workflows');

//     if (stored) {
//       // ✅ Use persisted data
//       this.workflowsSubject.next(JSON.parse(stored));
//     } else {
//       // ✅ Load mock JSON
//       this.http.get<Workflow[]>(this.MOCK_URL).pipe(
//         tap(data => {
//           localStorage.setItem('workflows', JSON.stringify(data));
//           this.workflowsSubject.next(data);
//         })
//       ).subscribe();
//     }
//   }

//   /**
//    * Persist + emit
//    */
//   private persist(data: Workflow[]): void {
//     localStorage.setItem('workflows', JSON.stringify(data));
//     this.workflowsSubject.next(data);
//   }

//   create(workflow: Workflow): void {
//     this.persist([...this.workflowsSubject.value, workflow]);
//   }

//   delete(id: number): void {
//     this.persist(this.workflowsSubject.value.filter(w => w.id !== id));
//   }

//   approve(id: number): void {
//     const updated: Workflow[] = this.workflowsSubject.value.map(w =>
//       w.id === id
//         ? {
//             ...w,
//             status: 'Approved' as const,
//             completedAt: new Date().toISOString()
//           }
//         : w
//     );
//     this.persist(updated);
//   }

//   reject(id: number): void {
//     const updated: Workflow[] = this.workflowsSubject.value.map(w =>
//       w.id === id
//         ? { ...w, status: 'Rejected' as const }
//         : w
//     );
//     this.persist(updated);
//   }

//   pending(id: number): void {
//     const updated: Workflow[] = this.workflowsSubject.value.map(w =>
//       w.id === id
//         ? { ...w, status: 'In Review' as const }
//         : w
//     );
//     this.persist(updated);
//   }

//   draft(id: number): void {
//     const updated: Workflow[] = this.workflowsSubject.value.map(w =>
//       w.id === id
//         ? { ...w, status: 'Draft' as const }
//         : w
//     );
//     this.persist(updated);
//   }

//   /**
//    * Async validator
//    */
//   isNameTaken(name: string): Observable<boolean> {
//     return of(this.workflowsSubject.value).pipe(
//       delay(400),
//       map(list => list.some(w => w.name === name))
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs/operators';
import { Workflow, WorkflowStatus } from '../models/workflow.model';

const STORAGE_KEY = 'workflows';

@Injectable({ providedIn: 'root' })
export class WorkflowService {

  /**
   * 🔥 Single source of truth for the entire app
   * Table / Chart / Dashboard subscribe to this
   */
  private workflowsSubject = new BehaviorSubject<Workflow[]>([]);
  workflows$ = this.workflowsSubject.asObservable();

  /**
   * Mock JSON path
   * Angular automatically serves files from /assets
   */
  private readonly MOCK_URL = 'assets/mock/workflow.json';

  constructor(private http: HttpClient) {
    this.init();
  }

  /**
   * App bootstrap logic
   *
   * 1️⃣ If localStorage has data → use it (simulate backend)
   * 2️⃣ Else load mock JSON → persist → emit
   */
  private init(): void {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      // ✅ Restore persisted mock state
      this.workflowsSubject.next(JSON.parse(stored));
    } else {
      // ✅ Load initial mock JSON
      this.http.get<Workflow[]>(this.MOCK_URL)
        .pipe(
          tap(data => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            this.workflowsSubject.next(data);
          })
        )
        .subscribe();
    }
  }

  /**
   * Persist data + emit new value
   */
  private persist(data: Workflow[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    this.workflowsSubject.next(data);
  }

  /**
   * ➕ Create workflow (mock)
   */
  create(workflow: Workflow): void {
    this.persist([...this.workflowsSubject.value, workflow]);
  }

  /**
   * 🗑 Delete workflow (mock)
   */
  delete(id: number): void {
    this.persist(
      this.workflowsSubject.value.filter(w => w.id !== id)
    );
  }

  /**
   * 🔁 Generic status update
   * (used by approve / reject / pending / draft)
   */
  private updateStatus(id: number, status: WorkflowStatus): void {
    const updated = this.workflowsSubject.value.map(w =>
      w.id === id
        ? {
            ...w,
            status,
            completedAt:
              status === 'Approved'
                ? new Date().toISOString()
                : undefined
          }
        : w
    );

    this.persist(updated);
  }

  approve(id: number): void {
    this.updateStatus(id, 'Approved');
  }

  reject(id: number): void {
    this.updateStatus(id, 'Rejected');
  }

  pending(id: number): void {
    this.updateStatus(id, 'In Review');
  }

  draft(id: number): void {
    this.updateStatus(id, 'Draft');
  }

  /**
   * 🔍 Async validator (mock)
   */
  isNameTaken(name: string): Observable<boolean> {
    return of(this.workflowsSubject.value).pipe(
      delay(400),
      map(list => list.some(w => w.name === name))
    );
  }

  /**
   * 🔄 Dev helper – reset mock data
   */
  resetMock(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.init();
  }
}
