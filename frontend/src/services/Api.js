import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://localhost:8080/api/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        }
    })
}
