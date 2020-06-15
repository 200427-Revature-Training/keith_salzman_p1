import React, { useState, useEffect } from 'react';
import { Form, Col, Button, Row, NavLink, Jumbotron, Container, Navbar, Alert, Fade } from 'react-bootstrap';
import * as loginRemote from '../remote/login.remote';
import './login.component.css';
import { useHistory } from 'react-router';

export const LoginComponent: React.FC = () => {
    const history = useHistory();
    const [inputUsername, setInputUsername] = useState('');
    const [inputUserPassword, setInputUserPassword] = useState('');
    const [alert, setAlert] = useState(false);

    useEffect(() => {
    }, [])

    let response: any;
    const setInformation = async () => {
        setInputUsername('');
        setInputUserPassword('');
        const userRole = response.data.userRole;
        const authToken = response.data.accessToken;
        const userId = response.data.userId;
        const userRoleId = response.data.userRoleId;
        localStorage.setItem('accessToken', authToken);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userRoleId', userRoleId)
        history.push('/home');
    }

    const addLoginCredentials = async () => {
        const payload = {
            username: inputUsername,
            userPassword: inputUserPassword
        };

        try {
            response = await loginRemote.checkLoginCredentials(payload);
            await setInformation();
        } catch {  setAlert(true) };
    }


    return (
        <div className="overall-container" >

            <Navbar bg="white" variant="dark">
                <Navbar.Brand id="navbar-lars" className="navbar-lars" href="/">
                    <img
                        alt=""
                        src="/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                Expense Reimbursement System
                </Navbar.Brand>
            </Navbar>
            <section id="home-container">
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="username-input" type="username" placeholder="Username" value={inputUsername} onChange={
                                (e) => setInputUsername(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="password-input" type="password" placeholder="Password" value={inputUserPassword} onChange={
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
                            <Button variant="outline-dark" type="submit" onClick={() => addLoginCredentials()}>Sign in</Button>
                        </Col>
                    </Form.Row>
                </div>
                <div id="button-container">
                    <Form.Row as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button variant="outline-dark">Sign Up</Button>
                        </Col>
                    </Form.Row>
                </div>
            </section>
            <Fade in={alert} timeout={100} appear={false}>
                <div className="lars-container" >
                    <Alert className='alert-lars' variant="danger">
                        Invalid username or password
                    </Alert>
                </div>
            </Fade>
        </div>
    );
}