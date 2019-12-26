import Api from './Api'
import { authHeader } from '../helpers/auth-header';

export default {
    retrieveCountries () {
        return Api().get('/countries/retrieveCountries', { headers: authHeader() });
    }
}
