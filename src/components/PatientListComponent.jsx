import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PatientService from '../services/PatientService';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class PatientListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            patients: []
        }
        this.editPatient = this.editPatient.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
    }

    componentDidMount() {
        PatientService.getPatients().then((response) => {
            this.setState({ patients: response.data });
        })
    }

    editPatient(id) {
        this.props.history.push(`/add-update-patient/${id}`);
    }

    deletePatient(id) {
        PatientService.deletePatient(id).then(res => {
            this.setState({ patients: this.state.patients.filter(patient => patient.id !== id) });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Patients</h2>
                <div className="row">
                    <Link className="nav-link" to="/add-update-patient/_add" >
                        <button className="btn btn-primary">+ Add</button>
                    </Link>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Birth Date</th>
                                <th>email</th>
                                <th>Phone</th>
                                <th>Info</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.patients.map(
                                    patient =>
                                        <tr key={patient.id}>
                                            <td className="align-middle">{patient.lastName}</td>
                                            <td className="align-middle">{patient.firstName}</td>
                                            <td className="align-middle">{patient.middleName}</td>
                                            <td className="align-middle">{patient.birthDate}</td>
                                            <td className="align-middle">{patient.email}</td>
                                            <td className="align-middle">{patient.phone}</td>
                                            <td className="align-middle">{patient.info}</td>
                                            <td>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                                    <button onClick={() => this.editPatient(patient.id)} className="btn btn-info btn-sm"
                                                        style={{ marginLeft: "30px" }}>
                                                        <FaEdit />
                                                    </button>
                                                </OverlayTrigger>

                                                <OverlayTrigger placement="top" overlay={<Tooltip>Remove</Tooltip>}>
                                                    <button onClick={() => {
                                                        if (window.confirm('Are you sure?')) {
                                                            this.deletePatient(patient.id)
                                                        }
                                                    }}
                                                        className="btn btn-danger btn-sm"
                                                        style={{ marginLeft: "30px" }}>
                                                        <MdDelete />
                                                    </button>
                                                </OverlayTrigger>
                                            </td>
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