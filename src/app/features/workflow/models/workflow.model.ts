export type WorkflowStatus =
  | 'Draft'
  | 'In Review'
  | 'Approved'
  | 'Rejected';

export interface Workflow {
  id: number;
  name: string;
  priority: 'Low' | 'Medium' | 'High';
  status: WorkflowStatus;
  assignedUsers: string[];
  dueDate: Date;
  createdAt: Date;
}
