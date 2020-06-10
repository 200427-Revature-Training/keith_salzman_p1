import { internalAxios, authAxios } from './internal-axios'
import { Reimbursement } from '../models/Reimbursement';
import { ReimbursementStatus } from '../models/ReimbursementStatus';


export const getAllReimbursements = async () => {
    const response = await authAxios.get<Reimbursement[]>('/employee');
    return response.data.map(reimbursement => {
        // Replace string birthdate with Date object
        reimbursement.reimbSubmitted = new Date(reimbursement.reimbSubmitted);
        return reimbursement;
    });
}

export const createReimbursement = async (reimbursement: Reimbursement) => {
    const response = await authAxios.post('/employee/reimbursement', reimbursement);
    return response;
}

export const patchReimbursement = async (reimbursementStatus: ReimbursementStatus) => {
    const response = await authAxios.patch('/financeManager', reimbursementStatus);
    return response;
}