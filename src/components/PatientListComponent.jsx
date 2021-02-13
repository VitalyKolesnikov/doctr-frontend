import React, { Component } from 'react';
import PatientService from '../services/PatientService';

class PatientListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            patients: []
        }
        this.addPatient = this.addPatient.bind(this);
        // this.editPatient = this.editPatient.bind(this);
        // this.deletePatient = this.deletePatient.bind(this);
    }

    componentDidMount() {
        PatientService.getPatients().then((response) => {
            this.setState({ patients: response.data });
        })
    }

    addPatient() {
        this.props.history.push('/add-patient');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Patients</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addPatient}>+ Add</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Birth Date</th>
                                <th>email</th>
                                <th>Phone</th>
                                <th>Info</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.patients.map(
                                    patient =>
                                        <tr key={patient.id}>
                                            <td>{patient.lastName}</td>
                                            <td>{patient.firstName}</td>
                                            <td>{patient.middleName}</td>
                                            <td>{patient.birthDate}</td>
                                            <td>{patient.email}</td>
                                            <td>{patient.phone}</td>
                                            <td>{patient.info}</td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}

export default PatientListComponent;