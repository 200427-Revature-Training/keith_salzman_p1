import { Reimbursement } from '../models/Reimbursement';
import * as employeeDao from '../daos/employee.dao';
import { LoginCredentials } from '../models/LoginCredentials';
import { ReimbursementPost } from '../models/ReimbursementPosts';


export function getReimbursementById(id: number): Promise<Reimbursement[]> {
    return employeeDao.getReimbursementById(id);
}

export function saveReimbursement(reimbursement: any): Promise<ReimbursementPost> {
    const newReimbursement = new ReimbursementPost(
        undefined,
        reimbursement.reimbAmount,
        new Date(),
        null,
        reimbursement.reimbDescription,
        reimbursement.reimbReceipt,
        reimbursement.reimbAuthor,
        null,
        1,
        reimbursement.reimbTypeId
    );
    if (reimbursement.reimbAmount && reimbursement.reimbDescription &&
        reimbursement.reimbReceipt && reimbursement.reimbAuthor &&
        reimbursement.reimbTypeId) {
        return employeeDao.saveReimbursement(newReimbursement);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function checkLoginCredentials(loginCredentials: any): Promise<LoginCredentials> {
    const newLoginCredentials = new LoginCredentials(
        loginCredentials.username,
        loginCredentials.userPassword,
        loginCredentials.userRole,
        loginCredentials.userId
    );
    if (loginCredentials.username && loginCredentials.userPassword) {
        return employeeDao.checkLoginCredentials(newLoginCredentials);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}
