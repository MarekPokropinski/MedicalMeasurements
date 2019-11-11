import Axios from 'axios';

const client = Axios.create({
    // baseURL: 'https://medical-measurements.herokuapp.com'
    baseURL: 'http://localhost:8000'
})

client.interceptors.request.use(config=>{
    return {...config,headers:{'Authorization':`Bearer google-oauth2 ${localStorage.getItem('token')}`}}
})

export default client;