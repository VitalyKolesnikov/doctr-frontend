import axios from 'axios';
import authHeader from './auth-header';

const PATIENTS_REST_ENDPOINT = "http://192.168.31.241:8080/api/v1/patients";

class PatientService {

    getPatients() {
        return axios.get(PATIENTS_REST_ENDPOINT, { headers: authHeader() });
    }

}

export default new PatientService();
