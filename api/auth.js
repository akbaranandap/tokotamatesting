import http from "@/lib/http"
import { CreateReq } from "@/prisma/user/user-model"

const api = {
    /**
     * @param {string} email 
     * @param {string} password 
     * @returns {import("axios").AxiosResponse} res 
     */
    async login(email, password) {
        const res = await http.post(`/auth/login`, {
            email,
            password
        })

        return res
    },
    /**
     * @returns {import("axios").AxiosResponse} res 
     */
    async user() {
        if (!http.defaults.headers.common.Authorization) {
            const AUTH_KEY = 'auth-token_'

            const token = localStorage.getItem(AUTH_KEY)
            http.defaults.headers.common.Authorization = `Bearer ${token}`
        }

        return await http.get(`/auth/user`)
    },
    /**
     * 
     * @param {CreateReq} data 
     * @returns {import("axios").AxiosResponse} res 
     */
    async signup(data) {
        const res = await http.post(`/auth/signup`, {
            username: data.username,
            email: data.email,
            password: data.password,
        })

        return res
    },
}

export default api