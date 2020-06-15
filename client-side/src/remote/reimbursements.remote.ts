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

/*
export const createReimbursement = async (reimbursement: any) => {
    const response = await authAxios.post('/employee/reimbursement', reimbursement);
    return response;
}
*/

export const patchReimbursement = async (reimbursementStatus: ReimbursementStatus) => {
    const response = await authAxios.patch('/financeManager', reimbursementStatus);
    return response;
}

export const createReimbursement = async (reimbursement: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(reimbursement.reimbReceipt);
    const promise = new Promise((resolve, reject) => {

        reader.onload = async () => {
            reimbursement.reimbReceipt = await reader.result;
            //console.log('AXIOS', reimbursement.reimbReceipt);
            const response = await authAxios.post('/employee/reimbursement', reimbursement);
            resolve(response);
        }
    });
    return promise;
}

export const getReimbursementsById = async (userId: number) => {
    const response = await authAxios.get<Reimbursement[]>(`/employee/${userId}/reimbursement`);
    return response.data.map(reimbursement => {
        // Replace string birthdate with Date object
        reimbursement.reimbSubmitted = new Date(reimbursement.reimbSubmitted);
        return reimbursement;
    });
}

export const getAllReimbursementsByStatus = async (status: string) => {
    const response = await authAxios.get<Reimbursement[]>(`/financemanager/status/${status}`);
    return response.data.map(reimbursement => {
        // Replace string birthdate with Date object
        reimbursement.reimbSubmitted = new Date(reimbursement.reimbSubmitted);
        return reimbursement;
    });
}