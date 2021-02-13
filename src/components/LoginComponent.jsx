import React, { Component } from 'react'
import { useState } from "react";
import AuthService from '../services/AuthService.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'nastya',
            password: 'qwas',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked(e) {
        e.preventDefault();
        AuthService
            .login(this.state.username, this.state.password)
            .then((response) => {
                this.props.history.push(`/patients`)
            }).catch(() => {
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        return (

            <div className="Login col-6">
                <Form onSubmit={this.loginClicked}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                    <Button type="submit" className="btn btn-success">
                        Login
                    </Button>
                    </Form.Group>
                    {this.state.hasLoginFailed && <div className="row alert alert-danger">Invalid login/password</div>}
                </Form>
            </div>
        )
    }
}

export default LoginComponent
