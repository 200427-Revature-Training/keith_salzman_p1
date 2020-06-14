/* istanbul ignore file */
export class ReimbursementStatus {
    reimbStatusId: number;
    reimbId: number;
    userId: number;

    static from(obj: ReimbursementStatusRow): ReimbursementStatus {
        const reimbursementStatus = new ReimbursementStatus(
            obj.reimb_status_id,
            obj.reimb_id,
            obj.ers_users_id
        );
        return reimbursementStatus;
    }

    constructor(reimbStatusId: number, reimbId: number, userId: number ) {
        this.reimbStatusId = reimbStatusId;
        this.reimbId = reimbId;
        this.userId = userId;
    }
}

export interface ReimbursementStatusRow {
    reimb_status_id: number;
    reimb_id: number;
    ers_users_id: number;
}
