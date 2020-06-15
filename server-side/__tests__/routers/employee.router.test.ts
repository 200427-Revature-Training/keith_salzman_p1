import express from 'express';
import bodyParser from 'body-parser';
import { employeeRouter } from '../../src/routers/employee.router';
import * as employeeService from '../../src/services/employee.service';
import request from 'supertest';
import { authenticationRouter } from '../../src/routers/authentication.router';
import { doesNotMatch } from 'assert';


jest.mock('../../src/services/employee.service');
const mockEmployeeService = employeeService as any;

const app = express();
app.use(bodyParser.json());
app.use('/employee', employeeRouter);
app.use('/authentication', authenticationRouter);

// let token;

// beforeAll((done) => {
//     await request(app)
//         .post('/authentication/login')
//         .send({
//             username: "kas",
//             userPassword: "12345"
//         })
//         .end((err, response) => {
//             done();
//         });
// });

// let token: any = "";

// Setup Express server and middleware

describe('GET /employee/:id/reimbursement', () => {
    test('Normal behavior Json with status 200', async () => {
        mockEmployeeService.getReimbursementById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/employee/1/reimbursement')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async () => {
        mockEmployeeService.getReimbursementById
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/employee/1/reimbursement')
            .expect(404);
    });

    test('500 internal server error', async () => {
        mockEmployeeService.getReimbursementById
            .mockImplementation(async () => { throw new Error() });

        await request(app)
            .get('/employee/1/reimbursement')
            .expect(500)
    })
})



describe('POST /employee/reimbursement', () => {
    test('Successful creation should return 201 status', async () => {

        mockEmployeeService.saveReimbursement
            .mockImplementation(async () => ({}));
        const payload = {
            reimbAmount: 999,
            reimbDescription: 'More Money',
            reimbReceipt: "image",
            reimbAuthor: 1,
            reimbTypeId: 1

        };

        await request(app)
            .post('/employee/reimbursement')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {

        mockEmployeeService.saveReimbursement
            .mockImplementation(async () => { throw new Error() });

        const payload = {
            reimbAmount: 999,
            reimbDescription: 'More Money',
            reimbReceipt: "image",
            reimbAuthor: 1,
            reimbTypeId: 1
        };

        await request(app)
            .post('/employee/reimbursement')
            .send(payload)
            .expect(500);
    });
});