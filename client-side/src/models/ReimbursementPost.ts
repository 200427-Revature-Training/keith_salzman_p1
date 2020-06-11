export interface ReimbursementPost {
    reimbAmount: number;
    reimbDescription: string;
    reimbReceipt: string;
    reimbAuthor: number | string | null;
    reimbTypeId: number;
}
