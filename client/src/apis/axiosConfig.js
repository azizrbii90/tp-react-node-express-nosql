import axios from 'axios'

let API = axios.create({ baseURL: 'http://localhost:5000/api' })

const token = localStorage.getItem('access_token')
if(token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default API;