import React, { useState, useEffect } from 'react';
import "./navbar.component.css";
//import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

//show={modalVisible} onHide={() => setModalVisible(false)}>

export const NavbarComponent: React.FC = () => {
    const isManager = localStorage.getItem('userRole') === 'manager';
    const isEmployee = localStorage.getItem('userRole') === 'employee';

    const [navStateReimbursemenOptions, setNavStateReimbursementOptions] = useState(true);
    const [navStateLoginOptions, setNavStateLoginOptions] = useState(true);

    useEffect(() => {
    decideState()}, [])

    const decideState = () => {
        if (isManager) {
            setNavStateReimbursementOptions(false)
            setNavStateLoginOptions(true)
        } else if (isEmployee) {
            setNavStateReimbursementOptions(true)
            setNavStateLoginOptions(true)
        } else {
            setNavStateReimbursementOptions(false)
            setNavStateLoginOptions(false)
        }
    }

    const logOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand id="navbrand" href="/home">ERS </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link hidden={navStateReimbursemenOptions} href="/reimbursementmanager">Manage Reimbursements</Nav.Link>
                    <Nav.Link href="/reimbursements">View/Add Reimbursements</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link hidden={navStateLoginOptions} href="/">Log In</Nav.Link>
                    <Nav.Link hidden ={!navStateLoginOptions} href="/" onClick={() => logOut()}>Log Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
