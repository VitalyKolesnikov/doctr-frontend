import axios from 'axios';
import authHeader from './auth-header';

const { REACT_APP_API_URL } = process.env;
const PATIENTS_REST_ENDPOINT = REACT_APP_API_URL + "/api/v1/patients";

class PatientService {

    getPatients() {
        return axios.get(PATIENTS_REST_ENDPOINT, { headers: authHeader() });
    }

}

export default new PatientService();
