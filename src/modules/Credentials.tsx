import axios from 'axios'

export const API_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com'


export const ApiClient = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json'
    }
})

