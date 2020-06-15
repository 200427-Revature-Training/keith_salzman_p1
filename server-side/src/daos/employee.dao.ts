/* istanbul ignore file */
import { db } from '../daos/db';
import { Reimbursement, ReimbursementRow } from '../models/Reimbursement';
import { LoginCredentials, LoginCredentialsRow } from '../models/LoginCredentials';
import { ReimbursementPost } from '../models/ReimbursementPosts';
import { ReimbursementPostRow } from '../models/ReimbursementPosts';


// Retrieve all Reimbursements and their statuses according to employee id
export async function getReimbursementById(id: number): Promise<Reimbursement[]> {
    const sql = 'SELECT ers_reimbursement.*, ers_reimbursement_status.reimb_status , ers_reimbursement_type.reimb_type FROM ers_reimbursement \
                LEFT JOIN ers_reimbursement_status ON ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id \
                LEFT JOIN ers_reimbursement_type ON ers_reimbursement.reimb_type_id = ers_reimbursement_type.reimb_type_id \
                WHERE ers_reimbursement.reimb_author = $1 ORDER BY reimb_submitted';

    const result = await db.query<ReimbursementRow>(sql, [id]);
        return result.rows.map(Reimbursement.from);
}

// Saves a new Reimbursement ticket
export async function saveReimbursement(reimbursement: ReimbursementPost): Promise<ReimbursementPost> {
    const sql = `INSERT INTO ers_reimbursement (reimb_amount, reimb_submitted, reimb_resolved, \
                reimb_description, reimb_receipt, reimb_author, reimb_resolver, reimb_status_id, \
                reimb_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    const result = await db.query<ReimbursementPostRow>(sql, [
        reimbursement.reimbAmount,
        new Date(),
        undefined,
        reimbursement.reimbDescription,
        reimbursement.reimbReceipt,
        reimbursement.reimbAuthor,
        null,
        1,
        reimbursement.reimbTypeId
    ]);

    return result.rows.map(ReimbursementPost.from)[0];
}

export async function checkLoginCredentials(loginCredentials: LoginCredentials): Promise<LoginCredentials> {
    const userExists: boolean = await usernameExists(loginCredentials.username);
    if (!userExists) {
        return undefined;
    }

    const sql = `SELECT ers_username, ers_password, user_role, ers_users_id, user_role_id FROM ers_users LEFT JOIN \
                    ers_user_roles ON user_role_id = ers_user_role_id WHERE ers_users.ers_username = $1`;

    const result = await db.query<LoginCredentialsRow>(sql, [
        loginCredentials.username
    ]);
    return  result.rows.map(LoginCredentials.from)[0];
}

export async function usernameExists(username: string): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT ers_username FROM ers_users WHERE ers_username = $1)`;
    const result = await db.query<Exists>(sql, [username]);
    return result.rows[0].exists;
}

interface Exists {
    exists: boolean;
}