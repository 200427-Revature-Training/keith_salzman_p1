import express from 'express';
import bodyParser from 'body-parser';
import { financeManagerRouter } from '../../src/routers/financeManager.router';
import * as financeManagerService from '../../src/services/financeManager.service';
import request from 'supertest';

// Setup mock for financeManagerService dependency
jest.mock('../../src/services/financeManager.service');
const mockFinanceManagerService = financeManagerService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/financeManager', financeManagerRouter);


describe('GET /financemanager', () => {
    test('Returns normally under normal circumstances', async () => {

        mockFinanceManagerService.getAllReimbursements
            .mockImplementation(async () => []);
        await request(app)
            .get('/financemanager')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });

    test('Returns normally under normal circumstances', async () => {

        mockFinanceManagerService.getAllReimbursements
            .mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/financemanager')
            .expect(500);
    });
});


describe('GET /financemanger/status/:status', () => {
    test('Normal behavior Json with status 200', async () => {
        mockFinanceManagerService.getAllReimbursementsByStatus
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/financemanager/status/pending')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async () => {
        mockFinanceManagerService.getAllReimbursementsByStatus
            .mockImplementation(async () => (undefined));

        await request(app)
            .get('/financemanager/status/pending')
            .expect(404);
    });

    test('500 internal server error', async () => {
        mockFinanceManagerService.getAllReimbursementsByStatus
            .mockImplementation(async () => { throw new Error() });

        await request(app)
            .get('/financemanager/status/pending')
            .expect(500)
    })
})


describe('PATCH /financemanager', () => {
    test('Successful update should return 201 status', async () => {
        mockFinanceManagerService.patchReimbursementStatus
            .mockImplementation(async () => ({}));

        const payload = {
            reimbId: 1,
            statusId: 1,
            userId: 1
        };

        await request(app)
            .patch('/financemanager')
            .send(payload)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockFinanceManagerService.patchReimbursementStatus
            .mockImplementation(async () => (undefined));

        await request(app)
            .patch('/financemanager')
            .expect(404);
        });

    test('Should return 500 when encountering an error', async () => {

        mockFinanceManagerService.patchReimbursementStatus
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            reimbId: 1,
            statusId: 1,
            userId: 1
        };

        await request(app)
            .patch('/financemanager')
            .send(payload)
            .expect(500);
    });
});
