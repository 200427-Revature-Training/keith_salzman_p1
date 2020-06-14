import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { LoginCredentials } from '../models/LoginCredentials';
import * as employeeService from '../services/employee.service';
import bcrypt from 'bcrypt';


export const authenticationRouter = express.Router();
export const jwt = jsonwebtoken;
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';
const refreshTokens = [];

// Checks login credentials and grants auth token if correct
authenticationRouter.post('/login', async (request, response, next) => {
    const loginCredentials = request.body;
    let LoginCredentialsResponse: LoginCredentials;

    try {
        LoginCredentialsResponse = await employeeService.checkLoginCredentials(loginCredentials);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
        return;
    }

    if (!LoginCredentialsResponse) {
        response.sendStatus(404);
    } else {

        const match = await bcrypt.compare(loginCredentials.userPassword, LoginCredentialsResponse.userPassword);

        if (match) {
            const accessToken = jwt.sign({ username: LoginCredentialsResponse.username, role: LoginCredentialsResponse.userRole }, accessTokenSecret, { expiresIn: '20m' });
            const refreshToken = jwt.sign({ username: LoginCredentialsResponse.username, role: LoginCredentialsResponse.userRole }, refreshTokenSecret);
            const userRole = LoginCredentialsResponse.userRole;
            const userId = LoginCredentialsResponse.userId
            refreshTokens.push(refreshTokens);
            response.status(201);
            response.json({ accessToken, refreshToken, userRole, userId });
        } else {
            response.sendStatus(401);
            console.log('Username or password are incorrect');
        }
    }
    next();
});

// token refresher endpoint
authenticationRouter.post('/token', async (request, response, next) => {
    const { token } = request.body;

    if (!token) {
        return response.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return response.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return response.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        response.json({
            accessToken
        });
    });
    next();
});

// Authentices the header of a request by evaluating token value
export const authenticateJWT = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return response.sendStatus(403);
            }

            request.user = user;
            next();
        });
    } else {
        response.sendStatus(401);
    }
}

