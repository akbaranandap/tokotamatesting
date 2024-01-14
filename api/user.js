import axios from "axios"

const url = process.env.NEXT_PUBLIC_API

const api = {
    
    /**
     * 
     * @returns {import("axios").AxiosResponse} res 
     */
    async count() {
        const res = await axios.get(`${url}/user/count`)
        return res
    },
    
}

export default api