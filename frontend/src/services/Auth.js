import Api from './Api'
import {authHeader} from "../helpers/auth-header";

export default {
    login (data) {
        return Api().post('/users/login', data);
    },
    retrieveUser() {
        return Api().get('/users/retrieve', { headers: authHeader() })
    },
    changePassword(data) {
        return Api().post('/users/resetPassword', data, { headers: authHeader() })
    }
}
