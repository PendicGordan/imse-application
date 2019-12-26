import Api from './Api'
import { authHeader } from '../helpers/auth-header';

export default {
    insertEmployee(data) {
        return Api().post('/employees/createEmployee', data, { headers: authHeader() });
    },
    retrieveEmployees () {
        return Api().get('/employees', { headers: authHeader() });
    },
    sortBy (data) {
        return Api().get(`/employees/sort/${data.sortBy}/${data.direction}`, { headers: authHeader() });
    },
    fetchTop10 (data) {
        return Api().get(`/employees/top/${data.direction}`, { headers: authHeader() });
    },
    fetchAverageReservations() {
        return Api().get(`/employees/average`, { headers: authHeader() });
    },
    fetchCount() {
        return Api().get(`/employees/count`, { headers: authHeader() });
    },
    exportAsCsv() {
        return Api().get(`/employees/export/csv`, { headers: authHeader() });
    }
}
