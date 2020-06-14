import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Row, NavLink, Jumbotron, Container, Navbar } from 'react-bootstrap';
import * as loginRemote from '../remote/login.remote';
import './login.component.css';
import { useHistory } from 'react-router';

export const LoginComponent: React.FC = () => {
    const history = useHistory();
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
        history.push('/home');
    }

    return (
        <div id="overall-container">

            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                Electronic Reimbursement System
                </Navbar.Brand>
            </Navbar>
            <section id="home-container">
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="username" placeholder="Username" value={inputUsername} onChange={
                                (e) => setInputUsername(e.target.value)} />
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
                    <Form.Group as={Row} controlId="formHorizontalCheck">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                        </Col>
                    </Form.Group>
                </Form>
                <div id="button-container">
                <Form.Row as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button variant="dark" type="submit" onClick={() => addLoginCredentials()}>Sign in</Button>
                    </Col>
                </Form.Row>
                </div>
            </section>
        </div>
    );
}