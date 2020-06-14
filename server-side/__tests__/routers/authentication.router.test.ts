import express from 'express';
import bodyParser from 'body-parser';
import * as employeeService from '../../src/services/employee.service';
import request from 'supertest';
import { authenticationRouter } from '../../src/routers/authentication.router';
import bcrypt from 'bcrypt';


// Setup mock for employeeService dependency
jest.mock('../../src/services/employee.service');
const mockEmployeeService = employeeService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/authentication', authenticationRouter);



describe('POST /authentication/login', () => {
    test('Successful creation should return 201 status', async () => {

        mockEmployeeService.checkLoginCredentials
            .mockImplementation(async () => ({}));
        const payload = {
            username: 'john',
            userPassword: 'Smith'

        };

        await request(app)
            .post('/authentication/login')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {

        mockEmployeeService.checkLoginCredentials
            .mockImplementation(async () => {throw new Error()});

        const payload = {
            username: 'john',
            userPassword: 'Smith'
        };

        await request(app)
            .post('/authentication/login')
            .send(payload)
            .expect(500);
    });
});