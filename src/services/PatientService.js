import axios from 'axios';
import authHeader from './auth-header';

const { REACT_APP_API_HOST } = process.env;
const PATIENTS_REST_ENDPOINT = REACT_APP_API_HOST + "/api/v1/patients/";

class PatientService {

    getPatients() {
        return axios.get(PATIENTS_REST_ENDPOINT, { headers: authHeader() });
    }

    addPatient(patient) {
        return axios.post(PATIENTS_REST_ENDPOINT, patient, { headers: authHeader() });
    }

    getPatientById(patientId){
        return axios.get(PATIENTS_REST_ENDPOINT + patientId, { headers: authHeader() });
    }

    updatePatient(patient, patientId){
        return axios.put(PATIENTS_REST_ENDPOINT + patientId, patient, { headers: authHeader() });
    }

    deletePatient(patientId){
        return axios.delete(PATIENTS_REST_ENDPOINT + patientId, { headers: authHeader() });
    }

}

export default new PatientService();
