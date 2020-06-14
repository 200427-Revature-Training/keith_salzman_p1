/* istanbul ignore file */
export class ReimbursementManagerGet {
    reimbId: number;
    reimbAmount: number;
    reimbSubmitted: Date;
    reimbResolved: Date | null;
    reimbDescription: string;
    reimbReceipt: string;
    reimbStatus: string;
    reimbAuthorName: string;
    reimbManagerName: string;
    reimbType: string;

    static from(obj: ReimbursementManagerGetRow): ReimbursementManagerGet {
        const reimbursement = new ReimbursementManagerGet(
            obj.reimb_id,
            obj.reimb_amount,
            new Date(obj.reimb_submitted),
            new Date(obj.reimb_resolved),
            obj.reimb_description,
            obj.reimb_receipt,
            obj.reimb_status,
            obj.reimb_author_name,
            obj.reimb_manager_name,
            obj.reimb_type
        );
        return reimbursement;
    }

    constructor(reimbId: number,
        reimbAmount: number,
        reimbSubmitted: Date,
        reimbResolved: Date | null,
        reimbDescription: string,
        reimbReceipt: string,
        reimbStatus: string,
        reimbAuthorName: string,
        reimbManagerName: string,
        reimbType: string
    ) {
        this.reimbId = reimbId;
        this.reimbAmount = reimbAmount;
        this.reimbSubmitted = reimbSubmitted;
        this.reimbResolved = reimbResolved;
        this.reimbDescription = reimbDescription;
        this.reimbReceipt = reimbReceipt;
        this.reimbStatus = reimbStatus;
        this.reimbAuthorName = reimbAuthorName;
        this.reimbManagerName = reimbManagerName;
        this.reimbType = reimbType;

    }
}

export interface ReimbursementManagerGetRow {
    reimb_id: number;
    reimb_amount: number;
    reimb_submitted: Date;
    reimb_resolved: Date | null;
    reimb_description: string;
    reimb_receipt: string;
    reimb_status: string;
    reimb_author_name: string;
    reimb_manager_name: string;
    reimb_type: string;
}
