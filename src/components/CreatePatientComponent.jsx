import React, { Component } from 'react';

class CreatePatientComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: '',
            email: '',
            phone: '',
            info: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeMiddleNameHandler = this.changeMiddleNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeBirthDateHandler = this.changeBirthDateHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeInfoHandler = this.changeInfoHandler.bind(this);

        this.savePatient = this.savePatient.bind(this);
    }

    savePatient = (e) => {
        e.preventDefault();
        let patient = {
            firstName: this.state.firstName, middleName: this.state.middleName, lastName: this.state.lastName, birthDate: this.state.birthDate,
            email: this.state.email, phone: this.state.phone, info: this.state.info
        };
        console.log('patient => ' + JSON.stringify(patient));
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeMiddleNameHandler = (event) => {
        this.setState({ middleName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeBirthDateHandler = (event) => {
        this.setState({ birthDate: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }

    changePhoneHandler = (event) => {
        this.setState({ phone: event.target.value });
    }

    changeInfoHandler = (event) => {
        this.setState({ info: event.target.value });
    }

    cancel() {
        this.props.history.push('/patients');
    }

    // getTitle(){
    //     if(this.state.id === '_add'){
    //         return <h3 className="text-center">Add Employee</h3>
    //     }else{
    //         return <h3 className="text-center">Update Employee</h3>
    //     }
    // }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                        <br></br>
                            {   
                                <h3 className="text-center">Add patient</h3>
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Middle Name:</label>
                                        <input placeholder="Middle Name" name="middleName" className="form-control"
                                            value={this.state.middleName} onChange={this.changeMiddleNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Birth Date:</label>
                                        <input placeholder="Birth Date" name="birthDate" className="form-control"
                                            value={this.state.birthDate} onChange={this.changeBirthDateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input placeholder="Email Address" name="email" className="form-control"
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input placeholder="Phone number" name="phone" className="form-control"
                                            value={this.state.phone} onChange={this.changePhoneHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Info:</label>
                                        <input placeholder="Info" name="info" className="form-control"
                                            value={this.state.info} onChange={this.changeInfoHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.savePatient}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <br></br>
            </div>
        );
    }
}

export default CreatePatientComponent;
