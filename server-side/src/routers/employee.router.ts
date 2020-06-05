import express from 'express';
import * as employeeService from '../services/employee.service';
import { Reimbursement } from '../models/Reimbursement';
import * as authenticator from './authentication.router';

export const employeeRouter = express.Router();

// Retrieves an Array of all past reimbursement tickets
employeeRouter.get('', authenticator.authenticateJWT, async (request, response, next) => {
    let reimbursements: Reimbursement[];

    try {
        reimbursements = await employeeService.getAllReimbursements();
        response.json(reimbursements);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
        return;
    }
    next();
});

// Retrieves an array of all past reimbursement ticket by employee ID
employeeRouter.get('/:id/reimbursement', authenticator.authenticateJWT, async (request, response, next) => {
    const id: number = parseInt(request.params.id);
    let reimbursementRequests: Reimbursement[];

    try {
        reimbursementRequests = await employeeService.getReimbursementById(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!reimbursementRequests) {
        response.sendStatus(404);
    } else {
        response.json(reimbursementRequests);
    }
    next();
});

// Route for adding/saving a new reimbursement request 
employeeRouter.post('/reimbursement', authenticator.authenticateJWT, async (request, response, next) => {
    const reimbursement = request.body;
    let newReimbursement: Reimbursement;

    try {
        newReimbursement = await employeeService.saveReimbursement(reimbursement);
        response.status(201);
        response.json(newReimbursement);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
        return;
    }
    next();
});

