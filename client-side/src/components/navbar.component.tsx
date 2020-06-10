import React from 'react';
import "./navbar.component.css";
//import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


export const NavbarComponent: React.FC = () => {

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand id="navbrand" href="/">ERS </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/upload">Manage Reimbursements</Nav.Link>
                    <Nav.Link href="/reimbursements">View/Add Reimbursements</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#deets">Help</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Contact Us
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
