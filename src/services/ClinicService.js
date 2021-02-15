import axios from 'axios';
import authHeader from './auth-header';

const { REACT_APP_API_HOST } = process.env;
const CLINICS_REST_ENDPOINT = REACT_APP_API_HOST + "/api/v1/clinics/";

class ClinicService {

    getClinics() {
        return axios.get(CLINICS_REST_ENDPOINT, { headers: authHeader() });
    }

    getClinicById(clinicId){
        return axios.get(CLINICS_REST_ENDPOINT + clinicId, { headers: authHeader() });
    }

}

export default new ClinicService();
