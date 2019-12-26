import Api from './Api'
import {authHeader} from "../helpers/auth-header";

export default {
    insertReservation(data) {
        return Api().post('/reservations/create', data, { headers: authHeader() });
    },
    retrieveReservations () {
        return Api().get('/reservations/fetch', { headers: authHeader() });
    },
    sortBy (data) {
        return Api().get(`/reservations/sortReservations/${data.sortBy}/${data.direction}`, { headers: authHeader() });
    },
    filter (data) {
        return Api().post('/reservations/filter', data, { headers: authHeader() });
    },
    filterActive() {
        return Api().get(`/reservations/active`, { headers: authHeader() });
    },
    batchDelete() {
        return Api().delete(`/reservations/delete`, { headers: authHeader() });
    },
    delete(data) {
        return Api().delete(`/reservations/delete/${data.id}`, { headers: authHeader() });
    },
    exportAsCsv() {
        return Api().get(`/reservations/export/csvReservations`, { headers: authHeader() });
    }
}
