import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import * as loginRemote from '../remote/login.remote';
import './home.component.css';

export const HomeComponent: React.FC = () => {

    const [inputUsername, setInputUsername] = useState('');
    const [inputUserPassword, setInputUserPassword] = useState('');

    useEffect(() => {
    }, [])
    
    
    const addLoginCredentials = async () => {
        
        const payload = {
            username: inputUsername,
            userPassword: inputUserPassword
        };
        const response = await loginRemote.checkLoginCredentials(payload);
        setInputUsername('');
        setInputUserPassword('');
        const userRole = response.data.userRole;
        const authToken = response.data.accessToken;
        const userId = response.data.userId;
        localStorage.setItem('accessToken', authToken);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userId', userId);
        console.log(+JSON.parse(JSON.stringify(localStorage.getItem('userId'))));
    }
    

    return (
        <div id="home-container">
            <h2>ERS Login</h2>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="username" placeholder="Username" value={inputUsername} onChange={
                                    (e) => setInputUsername(e.target.value)}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" value={inputUserPassword} onChange={
                                    (e) => setInputUserPassword(e.target.value)} />
                    </Col>
                </Form.Group>
                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
    </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Employee"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                type="radio"
                                label="Finance Manager"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
                <Form.Group as={Row} controlId="formHorizontalCheck">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Form.Check label="Remember me" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button  onClick={() => addLoginCredentials()}>Sign in</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}