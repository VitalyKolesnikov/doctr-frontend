import React, { Component } from 'react';
import PatientService from '../services/PatientService';
import Cleave from 'cleave.js/react';
import NumberFormat from 'react-number-format';

class AddPatientComponent extends Component {
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

        this.handleChange = this.handleChange.bind(this);
        this.savePatient = this.savePatient.bind(this);

    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    savePatient = (e) => {
        e.preventDefault();
        let patient = {
            firstName: this.state.firstName, middleName: this.state.middleName, lastName: this.state.lastName, birthDate: this.state.birthDate,
            email: this.state.email, phone: this.state.phone, info: this.state.info
        };
        console.log('patient => ' + JSON.stringify(patient));

        PatientService.addPatient(patient).then(res => {
            this.props.history.push('/patients');
        })
    }

    cancel() {
        this.props.history.push('/patients');
    }

    // getTitle(){
    //     if(this.state.id === '_add'){
    //         return <h3 className="text-center">Add patient</h3>
    //     }else{
    //         return <h3 className="text-center">Update patient</h3>
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
                                <form onSubmit={this.savePatient}>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Middle Name:</label>
                                        <input placeholder="Middle Name" name="middleName" className="form-control"
                                            value={this.state.middleName} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Birth Date:</label>
                                        <Cleave placeholder="dd.mm.yyyy" className="form-control"
                                            options={{
                                                date: true,
                                                delimiter: '.',
                                                datePattern: ['d', 'm', 'Y']
                                            }}
                                            name="birthDate"
                                            value={this.state.birthDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" placeholder="Email Address" name="email" className="form-control"
                                            value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <NumberFormat className="form-control"
                                            format="+7(###)###-####"
                                            allowEmptyFormatting mask="_"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Info:</label>
                                        <input placeholder="Info" name="info" className="form-control"
                                            value={this.state.info} onChange={this.handleChange} />
                                    </div>

                                    <button type="submit" className="btn btn-success">Save</button>
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

export default AddPatientComponent;
