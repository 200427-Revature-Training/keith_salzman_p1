export interface Reimbursement {
    reimbId?: number;
    reimbAmount: number;
    reimbSubmitted: Date | string;
    reimbResolved: Date | string ;
    reimbDescription: string;
    reimbReceipt: string;
    reimbAuthor: string;
    reimbResolver: number;
    reimbStatus: string;
    reimbType: string;
}
