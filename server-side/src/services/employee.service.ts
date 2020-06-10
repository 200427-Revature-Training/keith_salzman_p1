import { Reimbursement } from '../models/Reimbursement';
import * as employeeDao from '../daos/employee.dao';
import { LoginCredentials } from '../models/LoginCredentials';


export function getAllReimbursements(): Promise<Reimbursement[]> {
    return employeeDao.getAllReimbursements();
}

export function getReimbursementById(id: number): Promise<Reimbursement[]> {
    return employeeDao.getReimbursementById(id);
}

export function saveReimbursement(reimbursement: any): Promise<Reimbursement> {
    const newReimbursement = new Reimbursement(
        undefined,
        reimbursement.reimbAmount,
        new Date(reimbursement.reimbSubmitted),
        new Date(reimbursement.reimbResolved),
        reimbursement.reimbDescription,
        reimbursement.reimbReceipt,
        reimbursement.reimbAuthor,
        reimbursement.reimbResolver,
        reimbursement.reimbStatusId,
        reimbursement.reimbTypeId,
        reimbursement.reimbStatus

    );
    // Validate new trainer properties
    if (reimbursement.reimbAmount && reimbursement.reimbSubmitted &&
        reimbursement.reimbResolved && reimbursement.reimbDescription &&
        reimbursement.reimbReceipt && reimbursement.reimbAuthor &&
        reimbursement.reimbResolver && reimbursement.reimbStatusId &&
        reimbursement.reimbTypeId) {
        return employeeDao.saveReimbursement(newReimbursement);
    } else {
        console.log(newReimbursement);
        return new Promise((resolve, reject) => reject(422));
    }
}


export function checkLoginCredentials(loginCredentials: any): Promise<LoginCredentials> {
    const newLoginCredentials = new LoginCredentials(
        loginCredentials.username,
        loginCredentials.userPassword,
        loginCredentials.userRole
    );
    if (loginCredentials.username && loginCredentials.userPassword) {

        return employeeDao.checkLoginCredentials(newLoginCredentials);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}
