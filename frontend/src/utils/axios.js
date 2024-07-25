import axios from 'axios'

const apiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    timeout: 5000,

    headers: {
        'Content-Type': 'application/json', // request will be sent in json format
        Accept: 'application/json' // and will be accepted in json format as well
    }
})

export default apiInstance