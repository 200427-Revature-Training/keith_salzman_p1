export interface ReimbursementPost {
    reimbAmount: number;
    reimbDescription: string;
    reimbReceipt: File;
    reimbAuthor: number | string | null;
    reimbTypeId: number;
}
