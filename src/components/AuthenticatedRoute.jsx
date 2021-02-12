
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
// import AuthenticationService from '../services/AuthenticationService';
import AuthService from '../services/AuthService';

class AuthenticatedRoute extends Component {
    render() {
        if (AuthService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute
