import axios from "axios";

const url = process.env.NEXT_PUBLIC_API

const http = axios.create({
    baseURL: url
})

http.interceptors.request.use(
    config => {
        return config
    }, error => {
        return Promise.reject(error)
    })

export default http