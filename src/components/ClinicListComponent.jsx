import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ClinicService from '../services/ClinicService';

class ClinicListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clinics: []
        }
    }

    componentDidMount() {
        ClinicService.getClinics().then((response) => {
            this.setState({ clinics: response.data });
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Clinics</h2>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.clinics.map(
                                    clinic =>
                                        <tr key={clinic.id}>
                                            <td className="align-middle">{clinic.name}</td>
                                            <td className="align-middle">{clinic.phone}</td>
                                            <td className="align-middle">{clinic.address}</td>
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

export default ClinicListComponent;