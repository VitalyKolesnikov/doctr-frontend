import axios from 'axios';
import authHeader from './auth-header';

const { REACT_APP_API_HOST } = process.env;
const VISITS_REST_ENDPOINT = REACT_APP_API_HOST + "/api/v1/visits/";

class VisitService {

    getVisits() {
        return axios.get(VISITS_REST_ENDPOINT, { headers: authHeader() });
    }

    addVisit(visit) {
        return axios.post(VISITS_REST_ENDPOINT, visit, { headers: authHeader() });
    }

    getVisitById(visitId){
        return axios.get(VISITS_REST_ENDPOINT + visitId, { headers: authHeader() });
    }

    updateVisit(visit, visitId){
        return axios.put(VISITS_REST_ENDPOINT + visitId, visit, { headers: authHeader() });
    }

    deleteVisit(visitId){
        return axios.delete(VISITS_REST_ENDPOINT + visitId, { headers: authHeader() });
    }

}

export default new VisitService();
