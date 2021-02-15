import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AuthService from '../services/AuthService';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTooth } from 'react-icons/fa';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Navbar, Nav } from 'react-bootstrap';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const isUserLoggedIn = AuthService.isUserLoggedIn();
        const user = JSON.parse(localStorage.getItem('user'));

        return (
            <div>
                <header>
                    <Navbar bg="dark" variant="dark" expand="md" className="py-0">
                        <Navbar.Brand href="/patients" className="navbar-brand">
                            <FaTooth />&nbsp;DoctR
                            </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        {isUserLoggedIn &&
                            <Nav className="mr-auto">
                                <Nav.Link href="/patients">Patients</Nav.Link>
                            </Nav>}

                        {isUserLoggedIn &&
                            <Nav className="mr-auto">
                                <Nav.Link href="/clinics">Clinics</Nav.Link>
                            </Nav>}

                        {isUserLoggedIn &&
                            <Nav className="mr-auto">
                                <Nav.Link href="/visits">Visits</Nav.Link>
                            </Nav>}

                        <Navbar.Collapse className="justify-content-end">
                            {isUserLoggedIn &&
                                <Nav>
                                    <Nav.Link className="nav-link" href="/patients">
                                        {user.firstName} {user.lastName}
                                    </Nav.Link>
                                </Nav>}

                            {isUserLoggedIn &&
                                <Nav>
                                    <Nav.Link href="/logout" onClick={AuthService.logout}>
                                        <OverlayTrigger placement="left" overlay={<Tooltip>Logout</Tooltip>}>
                                            <FaSignOutAlt />
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </Nav>}

                        </Navbar.Collapse>
                    </Navbar>
                    <br></br>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
