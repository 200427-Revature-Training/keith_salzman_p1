/* istanbul ignore file */
import { db } from '../daos/db';
import { ReimbursementStatus, ReimbursementStatusRow } from '../models/ReimbursementStatus';
import { ReimbursementManagerGet } from '../models/ReimbursementManagerGet';
import { ReimbursementManagerGetRow } from '../models/ReimbursementManagerGet';


// ! propbably make this one auto sort by date  AND CHANGE THE NEXT TWO GETS TO RETURN ONLY SPECIFIC COLUMNS, NOT ALL
 // Retrieve all reimbursement request tickets and their status
export async function getAllReimbursements(): Promise<ReimbursementManagerGet[]> {
    const sql = 'SELECT reimb_id, reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_receipt, \
    employee.ers_username AS reimb_author_name, manager.ers_username AS reimb_manager_name, reimb_status FROM ers_reimbursement \
    LEFT JOIN ers_reimbursement_status ON ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id \
    LEFT JOIN ers_users AS employee ON ers_reimbursement.reimb_author = employee.ers_users_id\
    LEFT JOIN ers_users AS manager ON ers_reimbursement.reimb_resolver = manager.ers_users_id;'

    const result = await db.query<ReimbursementManagerGetRow>(sql, []);
    return result.rows.map(ReimbursementManagerGet.from);
    }

// retrieve all remimbursement request tickets by status 
export async function getAllReimbursementsByStatus(status: string): Promise<ReimbursementManagerGet[]> {
    const sql = 'SELECT reimb_id, reimb_amount, reimb_submitted, reimb_resolved, reimb_description, reimb_receipt, \
    employee.ers_username AS reimb_author_name, manager.ers_username AS reimb_manager_name, reimb_status FROM ers_reimbursement \
    LEFT JOIN ers_reimbursement_status ON ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id \
    LEFT JOIN ers_users AS employee ON ers_reimbursement.reimb_author = employee.ers_users_id\
    LEFT JOIN ers_users AS manager ON ers_reimbursement.reimb_resolver = manager.ers_users_id \
    WHERE ers_reimbursement_status.reimb_status = $1';

    const result = await db.query<ReimbursementManagerGetRow>(sql, [status]);
    return result.rows.map(ReimbursementManagerGet.from);
    }

// ! Fix this one to order by what value you want it to order 
// Retrieves all Reimbursment tickets and oders them by url declared column value 
export async function getAllReimbursementsSorted(sortValue: string): Promise<ReimbursementManagerGet[]> {
    const sql = 'SELECT * FROM ers_reimbursement LEFT JOIN ers_reimbursement_status ON \
                ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id \
                ORDER BY $1';

    const result = await db.query<ReimbursementManagerGetRow>(sql, [sortValue]);
    return result.rows.map(ReimbursementManagerGet.from);
    }

// Changes the status of a reimbursement request from pending to accepted or denied
export async function patchReimbursementStatus(reimbursementStatus: ReimbursementStatus): Promise<ReimbursementStatus> {
    const sql = `UPDATE ers_reimbursement SET reimb_status_id = COALESCE($1, reimb_status_id), \
                reimb_resolver = COALESCE($3, reimb_resolver), reimb_resolved = COALESCE($4, reimb_resolved) \
                WHERE reimb_id = $2 RETURNING *`;

    const result = await db.query<ReimbursementStatusRow>(sql, [
        reimbursementStatus.reimbStatusId,
        reimbursementStatus.reimbId,
        reimbursementStatus.userId,
        new Date()

    ]);
    return result.rows.map(ReimbursementStatus.from)[0];
}