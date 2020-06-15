import express from 'express';
import * as employeeService from '../services/employee.service';
import { Reimbursement } from '../models/Reimbursement';
import * as authenticator from './authentication.router';
import { ReimbursementPost } from '../models/ReimbursementPosts';


export const employeeRouter = express.Router();

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
    // console.log('IMAGE FILE', reimbursement)
    let newReimbursement: ReimbursementPost;

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



