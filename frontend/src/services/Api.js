import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3000/v1/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json'
        }
    })
}
