//! ERASE THIS FILE 
export class ReimbursementType {
    reimbTypeId: number;
    reimbType: string;

    static from(obj: ReimbursementTypeRow): ReimbursementType {
        const reimbursementType = new ReimbursementType(
            obj.reimb_type_id,
            obj.reimb_type
        );
        return reimbursementType;
    }

    constructor(reimbTypeId: number, reimbType: string) {
        this.reimbTypeId = reimbTypeId;
        this.reimbType = reimbType;
    }
}

export interface ReimbursementTypeRow {
    reimb_type_id: number;
    reimb_type: string;
}

