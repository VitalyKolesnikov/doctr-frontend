import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import VisitService from '../services/VisitService';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class VisitListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visits: []
        }
        this.editVisit = this.editVisit.bind(this);
        this.deleteVisit = this.deleteVisit.bind(this);
    }

    componentDidMount() {
        VisitService.getVisits().then((response) => {
            this.setState({ visits: response.data });
        })
    }

    editVisit(id) {
        this.props.history.push(`/add-update-visit/${id}`);
    }

    deleteVisit(id) {
        VisitService.deleteVisit(id).then(res => {
            this.setState({ visits: this.state.visits.filter(visit => visit.id !== id) });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Visits</h2>
                <div className="row">
                    <Link className="nav-link" to="/add-update-visit/_add" >
                        <button className="btn btn-primary">+ Add</button>
                    </Link>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Clinic</th>
                                <th>Date</th>
                                <th>Sum</th>
                                <th>Info</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.visits.map(
                                    visit =>
                                        <tr key={visit.id}>
                                            <td className="align-middle">{visit.patient.lastName} {visit.patient.firstName} {visit.patient.middleName}</td>
                                            <td className="align-middle">{visit.clinic.name}</td>
                                            <td className="align-middle">{visit.visitDate}</td>
                                            <td className="align-middle">{visit.sumRub},{visit.sumKop}</td>
                                            <td className="align-middle">{visit.info}</td>
                                            <td>
                                                <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                                    <button onClick={() => this.editVisit(visit.id)} className="btn btn-info btn-sm"
                                                        style={{ marginLeft: "35px" }}>
                                                        <FaEdit />
                                                    </button>
                                                </OverlayTrigger>

                                                <OverlayTrigger placement="top" overlay={<Tooltip>Remove</Tooltip>}>
                                                    <button onClick={() => {
                                                        if (window.confirm('Are you sure?')) {
                                                            this.deleteVisit(visit.id)
                                                        }
                                                    }}
                                                        className="btn btn-danger btn-sm"
                                                        style={{ marginLeft: "35px" }}>
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

export default VisitListComponent;