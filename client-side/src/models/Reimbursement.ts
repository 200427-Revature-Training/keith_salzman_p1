export interface Reimbursement {
    reimbId?: number;
    reimbAmount: number;
    reimbSubmitted: Date | string;
    reimbResolved: Date | string ;
    reimbDescription: string;
    reimbReceipt: string;
    reimbAuthorName: string;
    reimbManagerName: number;
    reimbStatus: string;
    reimbType: string;
}
