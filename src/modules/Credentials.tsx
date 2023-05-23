import axios from 'axios'

export const API_URL = 'https://api.deezer.com'


export const ApiClient = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json'
    }
})

export const getDuration = (duration:number) => {
    let result = '00:00'
    if (duration) {
        result = '0'+(duration / 60).toFixed(2).split('.').join(':')
    }
    return result
}