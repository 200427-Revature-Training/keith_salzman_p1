import { internalAxios, authAxios } from './internal-axios'
import { Reimbursement } from '../models/Reimbursement';
import { ReimbursementStatus } from '../models/ReimbursementStatus';
import { ReimbursementPost } from '../models/ReimbursementPost';

export const getAllReimbursements = async () => {
    const response = await authAxios.get<Reimbursement[]>('/financemanager');
    return response.data.map(reimbursement => {
        // Replace string birthdate with Date object
        reimbursement.reimbSubmitted = new Date(reimbursement.reimbSubmitted);
        return reimbursement;
    });
}

export const createReimbursement = async (reimbursement: ReimbursementPost) => {
    const response = await authAxios.post('/employee/reimbursement', reimbursement);
    return response;
}

export const patchReimbursement = async (reimbursementStatus: ReimbursementStatus) => {
    const response = await authAxios.patch('/financeManager', reimbursementStatus);
    return response;
}

export const getReimbursementsById = async (userId: number) => {
    const response = await authAxios.get<Reimbursement[]>(`/employee/${userId}/reimbursement`);
    return response.data.map(reimbursement => {
        // Replace string birthdate with Date object
        reimbursement.reimbSubmitted = new Date(reimbursement.reimbSubmitted);
        return reimbursement;
    });
}
