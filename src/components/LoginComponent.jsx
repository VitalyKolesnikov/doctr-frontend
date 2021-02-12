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

    loginClicked() {
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
                <Form>
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
                    <Button className="btn btn-success" onClick={this.loginClicked}>
                        Login
                    </Button>
                    </Form.Group>
                    {this.state.hasLoginFailed && <div className="row alert alert-danger">Invalid login/password</div>}
                </Form>
            </div>

            // <div>
            //     <h1>Login</h1>
            //     <div className="container">
            //         {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
            //         {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
            //         {this.state.showSuccessMessage && <div>Login Sucessful</div>}
            //         {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
            //         User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
            //         Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            //         <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            //     </div>
            // </div>
        )
    }
}

export default LoginComponent
