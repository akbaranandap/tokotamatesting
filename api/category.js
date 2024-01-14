import { Category, ProductCategoryReq } from "@/prisma/category/category-model"
import { isAxiosError } from "axios"
import http from "@/lib/http"
const url = process.env.NEXT_PUBLIC_API

const api = {

    /**
     * 
     * @param {ProductCategoryReq} category
     * @returns {Category | string} res 
     */
    async createCategory(category) {
        try {
            const res = await http.post(`${url}/category`, category)
            if (res.status === 200) {
                return res.data
            }

            return ''
        } catch (error) {
            if (isAxiosError(error)) {
                return error.response.data.message
            }
        }
    },

    /**
     * @returns {Category[]}
     */
    async getAllCategory() {
        try {
            const res = await http.get(`${url}/category`)
            return res.status === 200 ? res.data : []
        } catch (error) {
            return []
        }
    },
    
    /**
     * @param {number} id 
     * @returns {boolean}
     */
    async deleteCategory(id) {
        try {
            const res = await http.delete(`${url}/category/${id}`)
            return res.status === 200
        } catch (error) {
            return false
        }
    },


}

export default api