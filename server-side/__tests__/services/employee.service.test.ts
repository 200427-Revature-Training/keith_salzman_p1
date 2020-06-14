import * as employeeService from '../../src/services/employee.service';
import * as employeeDao from '../../src/daos/employee.dao';
import { User } from '../../src/models/User';
import { Reimbursement } from '../../src/models/Reimbursement';
import { ReimbursementPost } from '../../src/models/ReimbursementPosts';


jest.mock('../../src/daos/employee.dao');

const mockEmployeeDao = employeeDao as any;


describe('getReimbursementById', () => {
    test('succesful get of a reimbursement by ID', async () => {
        expect.assertions(1);

        mockEmployeeDao.getReimbursementById
            .mockImplementation(() => ({}));

        const id: number = 100;

        const result = await employeeService.getReimbursementById(id);
            expect(result).toBeDefined();
        });

});


describe('saveReimbursement', () => {
    test('422 returned if no amount provided', async () => {
        expect.assertions(1);

        mockEmployeeDao.saveReimbursement
            .mockImplementation(() => ({}));

        const payload = {
            reimbDescription: "More Money",
            reimbReceipt: "image",
            reimbAuthor: 1,
            reimbTypeId: 1
        }

        try {
            await employeeService.saveReimbursement(payload);
            fail('employeeService.saveReimbursement did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no description is provided', async () => {
        expect.assertions(1);
        mockEmployeeDao.saveReimbursement
        .mockImplementation(() => ({}));

        const payload = {
            reimbAoumt: 100,
            reimbReceipt: "image",
            reimbAuthor: 1,
            reimbTypeId: 1
        }

        try {
            await employeeService.saveReimbursement(payload);
            fail('employeeService.saveReinbursement did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no receipt provided', async () => {
        expect.assertions(1);
        mockEmployeeDao.saveReimbursement
            .mockImplementation(() => ({}));

        const payload = {
            reimbAoumt: 100,
            reimbDescription: "More Money",
            reimbAuthor: 1,
            reimbTypeId: 1
        }

        try {
            await employeeService.saveReimbursement(payload);
            fail('employeeService.saveReimbursement did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no author provided', async () => {
        expect.assertions(1);
        mockEmployeeDao.saveReimbursement
            .mockImplementation(() => ({}));

        const payload = {
            reimbAoumt: 100,
            reimbDescription: "More Money",
            reimbReceipt: "image",
            reimbTypeId: 1
        }

        try {
            await employeeService.saveReimbursement(payload);
            fail('employeeService.saveReimbursement did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no type ID provided', async () => {
        expect.assertions(1);
        mockEmployeeDao.saveReimbursement
            .mockImplementation(() => ({}));

        const payload = {
            reimbAoumt: 100,
            reimbDescription: "More Money",
            reimbReceipt: "image",
            reimbAuthor: 1
        }

        try {
            await employeeService.saveReimbursement(payload);
            fail('employeeService.saveReimbursement did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to User object', async () => {
        expect.assertions(2);

        mockEmployeeDao.saveReimbursement
            .mockImplementation((o) => o);

        const payload = {
            reimbAoumt: 100,
            reimbDescription: "More Money",
            reimbReceipt: "image",
            reimbAuthor: 1,
            reimbTypeId: 1
        };

        const result = await employeeService.saveReimbursement(payload);

        expect(payload).not.toBeInstanceOf(ReimbursementPost);
        expect(result).toBeInstanceOf(ReimbursementPost);
    });

    test('ID value of input is replaced in output', async () => {
        expect.assertions(1);

        mockEmployeeDao.saveReimbursement
            .mockImplementation(o => o);

        const payload = {
            reimbId: 1,
            reimbAoumt: 100,
            reimbDescription: "More Money",
            reimbReceipt: "image",
            reimbAuthor: 1,
            reimbTypeId: 1
        };

        const result = await employeeService.saveReimbursement(payload);
        expect(result.reimbId).not.toBe(payload.reimbId);
    });

    test('Extraneous fields in input are not in output', async () => {
        expect.assertions(1);

        mockEmployeeDao.saveReimbursement
            .mockImplementation(o => o);

        const payload = {
            reimbAoumt: 100,
            reimbDescription: "More Money",
            reimbReceipt: "image",
            reimbAuthor: 1,
            reimbTypeId: 1,
            likesSkateboards: true
        };

        const result = await employeeService.saveReimbursement(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});




describe('checkLoginCredentials', () => {
    test('422 returned if no username provided', async () => {
        expect.assertions(1);

        mockEmployeeDao.checkLoginCredentials
            .mockImplementation(() => ({}));

        const payload = {
            userPassword: 'smith',
        }

        try {
            await employeeService.checkLoginCredentials(payload);
            fail('trainerService.saveTrainer did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });

    test('422 returned if no password provided', async () => {
        expect.assertions(1);

        mockEmployeeDao.checkLoginCredentials
            .mockImplementation(() => ({}));

        const payload = {
            username: 'smith',
        }

        try {
            await employeeService.checkLoginCredentials(payload);
            fail('trainerService.saveTrainer did not throw expected error');
        } catch(err) {
            expect(err).toBeDefined();
        }
    });
});

