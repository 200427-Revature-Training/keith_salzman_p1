import { Reimbursement } from '../models/Reimbursement';
import * as financeManagerDao from '../daos/financeManager.dao';
import { ReimbursementStatus } from '../models/ReimbursementStatus';
import { ReimbursementManagerGet } from '../models/ReimbursementManagerGet';


export function getAllReimbursements(): Promise<ReimbursementManagerGet[]> {
    return financeManagerDao.getAllReimbursements();
}

export function getAllReimbursementsByStatus(status: string): Promise<ReimbursementManagerGet[]> {
    return financeManagerDao.getAllReimbursementsByStatus(status);
}

export function getAllReimbursementsSorted(sortValue: string): Promise<ReimbursementManagerGet[]> {
    return financeManagerDao.getAllReimbursementsByStatus(sortValue);
}

export function patchReimbursementStatus(input: any): Promise<ReimbursementStatus> {

    const reimbursementStatus = new ReimbursementStatus(
        input.reimbStatusId,
        input.reimbId,
        input.userId,
        new Date()
    );

    if (!reimbursementStatus.reimbStatusId) {
        throw new Error ('400');
    }

    return financeManagerDao.patchReimbursementStatus(reimbursementStatus);
    }