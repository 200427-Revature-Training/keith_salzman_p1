import * as financeManagerService from '../../src/services/financeManager.service';
import * as financeManagerDao from '../../src/daos/financeManager.dao';
import { User } from '../../src/models/User';


jest.mock('../../src/daos/financeManager.dao');

const mockFinanceManagerDao = financeManagerDao as any;

describe('getAllReimbursements', () => {
    test('succesful get of all Reimbursements', async () => {
        expect.assertions(1);

        mockFinanceManagerDao.getAllReimbursements
            .mockImplementation(() => ({}));


        const result = await financeManagerService.getAllReimbursements();
        expect(result).toBeDefined();
    });
});

describe('getAllReimbursementsByStatus', () => {
    test('succesful get of all reimbursements by status', async () => {
        expect.assertions(1);

        mockFinanceManagerDao.getAllReimbursementsByStatus
            .mockImplementation(() => ({}));

        const status: string = "pending";

        const result = await financeManagerService.getAllReimbursementsByStatus(status);
        expect(result).toBeDefined();
    });

});





describe('patchReimbursementStatus', () => {

    test('successful patch', async () => {
        expect.assertions(1);

        mockFinanceManagerDao.patchReimbursementStatus
            .mockImplementation(() => ({}));

        const payload = {
            userId: 1,
            reimbStatusId: 1,
            reimbId: 1
        };

        const result = await financeManagerService.patchReimbursementStatus(payload);
        expect(result).toBeTruthy();
    });

    test('patch fails when no valid id is provided', async () => {
        expect.assertions(1);

        mockFinanceManagerDao.patchReimbursementStatus
            .mockImplementation(() => ({}));

        const payload = {
            userId: 1,
            reimbId: 1
        };

        try {
            await financeManagerService.patchReimbursementStatus(payload);
            fail();
        } catch (err) {
            expect(err).toBeTruthy();
        }
    });
});