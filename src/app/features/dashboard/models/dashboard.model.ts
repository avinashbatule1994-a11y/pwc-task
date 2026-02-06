export interface DashboardStats {
    byStatus: {
        Draft: number;
        pending: number;
        Approved: number;
        Rejected: number;
    };
    overdue: number;
    averageCompletionDays: number | null;
}
