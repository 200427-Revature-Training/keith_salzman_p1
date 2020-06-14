import express from 'express';
import bodyParser from 'body-parser';
import { employeeRouter } from './routers/employee.router';
import { financeManagerRouter } from './routers/financeManager.router';
import { db } from './daos/db';
import { authenticationRouter } from './routers/authentication.router';

// Initialize express app
const app = express();

// Gets port environment variable value
const port = process.env.PORT || 3000;

app.set('port', port);
/* CORS middleware - Sets CORS headers to allow requests from
        the domain of the intended client */

// Parses body of request
// app.use(bodyParser.json());

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));


app.use((request, response, next) => {
    console.log('Request received - processing at middleware 1');
    next();
})

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    response.setHeader('Access-Control-Allow-Methods', 'PATCH, GET, POST');
    response.setHeader('Access-Control-Allow-Headers', 'content-type, authorization')

    next();
})

app.use('/authentication', authenticationRouter)
app.use('/employee', employeeRouter)
app.use('/financeManager', financeManagerRouter)

process.on('unhandledRejection', () => {
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

// Begin listening on the designated port
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});

