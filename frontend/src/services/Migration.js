import Api from './Api'

export default {
    migrate () {
        return Api().get('/migrate');
    }
}
