import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import AuthService from '../services/AuthService';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTooth } from 'react-icons/fa';
import { GiTooth } from 'react-icons/gi';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const isUserLoggedIn = AuthService.isUserLoggedIn();

        const renderTooltip = props => (
            <Tooltip {...props}>Logout</Tooltip>
        );

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <a href="/patients" className="navbar-brand">
                                <FaTooth />
                                &nbsp;DoctR
                            </a>
                        </div>
                        <ul className="navbar-nav">
                            {/* <li><Link className="nav-link" to="/patients">Patients</Link></li> */}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {
                                isUserLoggedIn &&
                                <li>
                                    <Link className="nav-link" to="/logout" onClick={AuthService.logout}>
                                        <OverlayTrigger placement="left" overlay={renderTooltip}>
                                            <FaSignOutAlt />
                                        </OverlayTrigger>
                                    </Link>
                                </li>
                            }
                        </ul>
                    </nav>
                    <br></br>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
