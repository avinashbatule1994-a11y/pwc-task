// export type WorkflowStatus =
//   | 'Draft'
//   | 'In Review'
//   | 'Approved'
//   | 'Rejected';

// export interface Workflow {
//   id: number;
//   name: string;
//   priority: 'Low' | 'Medium' | 'High';
//   status: WorkflowStatus;
//   assignedUsers: string[];
//   dueDate: Date;
//   createdAt: Date;
// }

export type WorkflowStatus =
  | 'Draft'
  | 'In Review'
  | 'Approved'
  | 'Rejected';

export interface Workflow {
  id: number;
  name: string;
  status: WorkflowStatus;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;        // ISO string
  createdAt: string;     // ISO string
  completedAt?: string;
  assignedUsers: string[];
}

