import Api from './Api'
import { authHeader } from '../helpers/auth-header';

export default {
    retrieveCompanies () {
        return Api().get('/companies/getAll', { headers: authHeader() });
    }
}
