
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Workflow } from '../../models/workflow.model';
import { WorkflowService } from '../../services/workflow.service';

interface PageQuery {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
}

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.scss']
})
export class WorkflowListComponent {

  displayedColumns = ['name', 'status', 'priority', 'dueDate', 'actions'];

  /** Pagination + filter state (acts like backend query) */
  private querySubject = new BehaviorSubject<PageQuery>({
    page: 1,
    pageSize: 5
  });

  query$ = this.querySubject.asObservable();

  /** Total records (after filtering) */
  total$ = combineLatest([
    this.workflowService.workflows$,
    this.query$
  ]).pipe(
    map(([list, query]) =>
      this.applyFilters(list, query).length
    )
  );

  /** Table data (filtered + paginated) */
  workflows$ = combineLatest([
    this.workflowService.workflows$,
    this.query$
  ]).pipe(
    map(([list, query]) => {
      const filtered = this.applyFilters(list, query);
      const start = (query.page - 1) * query.pageSize;
      return filtered.slice(start, start + query.pageSize);
    })
  );

  constructor(private workflowService: WorkflowService) {}

  /* ---------------- SEARCH ---------------- */

  applySearch(value: string): void {
    this.querySubject.next({
      ...this.querySubject.value,
      page: 1,
      search: value.toLowerCase()
    });
  }

  /* ---------------- STATUS FILTER ---------------- */

  filterStatus(status: string): void {
    this.querySubject.next({
      ...this.querySubject.value,
      page: 1,
      status: status || undefined
    });
  }

  /* ---------------- PAGINATION ---------------- */

  pageChanged(event: PageEvent): void {
    this.querySubject.next({
      ...this.querySubject.value,
      page: event.pageIndex + 1,
      pageSize: event.pageSize
    });
  }

  /* ---------------- ACTIONS ---------------- */

  approve(row: Workflow) {
    this.workflowService.approve(row.id);
  }

  reject(row: Workflow) {
    this.workflowService.reject(row.id);
  }

  pending(row: Workflow) {
    this.workflowService.pending(row.id);
  }

  draft(row: Workflow) {
    this.workflowService.draft(row.id);
  }

  delete(row: Workflow) {
    this.workflowService.delete(row.id);
  }

  create() {
    alert('Create clicked');
  }

  edit(row: Workflow) {
    alert(`Edit: ${row.name}`);
  }

  /* ---------------- HELPERS ---------------- */

  private applyFilters(list: Workflow[], query: PageQuery): Workflow[] {
    return list.filter(w => {
      const matchSearch = query.search
        ? w.name.toLowerCase().includes(query.search)
        : true;

      const matchStatus = query.status
        ? w.status === query.status
        : true;

      return matchSearch && matchStatus;
    });
  }
}
