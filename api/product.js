import { Product, ProductImage, ProductReq, ProductImageReq, Cart } from "@/prisma/product/product-model"
import http from '@/lib/http'
import { isAxiosError } from "axios"
import { ProductCategory } from "@/prisma/category/category-model"
import { File } from "@/prisma/file/file-model"
import { ReviewReq } from "@/prisma/review/review-model"

const api = {

    /**
     * 
     * @param {ProductReq} product
     * @returns {Product | string} res 
     */
    async createProduct(product) {
        try {
            const res = await http.post(`/product`, product)
            if (res.status === 201) {
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
     * 
     * @param {FormData} image
     * @returns {File | string} res 
     */
    async uploadImage(image) {
        try {
            const res = await http.post(`/product/image/upload`, image, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            if (res.status === 201) {
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
     * 
     * @param {ProductImageReq} productImage
     * @returns {ProductImage | string} res 
     */
    async createProductImage(productImage) {
        try {
            const res = await http.post(`/product/image/`, productImage)
            if (res.status === 201) {
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
     * 
     * @param {ProductReq} product
     * @param {number} id
     * @returns {Product | string} res 
     */
    async editProduct(product, id) {
        try {
            const res = await http.put(`/product/${id}`, product)
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
     * 
     * @returns {ProductCategory[]} res 
     */
    async getAllProduct() {
        try {
            const res = await http.get(`/product`)
            return res.status === 200 ? res.data : []

        } catch (error) {
            if (isAxiosError(error)) {
                return []
            }
        }
    },

    /**
     * 
     * @returns {{ id: number }[]} res 
     */
    async getAllProductIds() {
        try {
            const res = await http.get(`/product/ids/`)
            return res.status === 200 ? res.data : []

        } catch (error) {
            if (isAxiosError(error)) {
                return []
            }
        }
    },

    /**
     * @param {number} id 
     * @returns {Product | string} res 
     */
    async getProduct(id) {
        try {
            const res = await http.get(`/product/${id}`)
            return res.status === 200 ? res.data : ''

        } catch (error) {
            if (isAxiosError(error)) {
                return error.response.data.message
            }
        }
    },

    /**
     * @param {number} id 
     */
    async deleteProduct(id) {
        try {
            const res = await http.delete(`/product/${id}`)
            return res.status === 200

        } catch (error) {
            if (isAxiosError(error)) {
                return false
            }
        }
    },

    /**
     * @returns {ProductImage[]}
     */
    async getFeaturedProductImage() {
        try {
            const res = await http.get(`/product/image/featured`)
            return res.status === 200 ? res.data : []

        } catch (error) {
            if (isAxiosError(error)) {
                return []
            }
        }
    },

    /**
     * @param {number} id 
     */
    async deleteProductImage(id) {
        try {
            const res = await http.delete(`/product/image/${id}`)
            return res.status === 200

        } catch (error) {
            if (isAxiosError(error)) {
                return false
            }
        }
    },

    /**
     * @param {ReviewReq[]} reviews
     */
    async addReviews(reviews) {
        try {
            const res = await http.post(`/product/reviews`, reviews)
            return res.status === 200

        } catch (error) {
            if (isAxiosError(error)) {
                return false
            }
        }
    },

    /**
     * @param {number} reviewId
     */
    async deleteReview(reviewId) {
        try {
            const res = await http.delete(`/product/reviews/${reviewId}`)
            return res.status === 200

        } catch (error) {
            if (isAxiosError(error)) {
                return false
            }
        }
    },

    /**
     * @param {ReviewReq[]} reviews
     */
    async updateReviews(reviews) {
        try {
            const res = await http.put(`/product/reviews`, reviews)
            return res.status === 200

        } catch (error) {
            if (isAxiosError(error)) {
                return false
            }
        }
    },

    /**
     * @param {ReviewReq[]} reviews
     * @returns {Cart | string} 
     */
    async addProductToCart(productId) {
        try {
            const res = await http.post(`/product/cart`, {
                productId: productId
            })
            
            return res.status === 201

        } catch (error) {
            if (isAxiosError(error)) {
                return error.response.data.message
            }
        }
    },

    /**
     * @returns {Cart[] | string} 
     */
    async getProductsFromCart() {
        try {
            const res = await http.get(`/product/cart`)
            return res.status === 200 ? res.data : undefined

        } catch (error) {
            if (isAxiosError(error)) {
                return error.response.data.message
            }
        }
    },

    /**
     * @param {ReviewReq[]} reviews
     * @returns {Cart | string} 
     */
    async deleteProductFromCart(productId) {
        try {
            const res = await http.delete(`/product/cart/${productId}`, {
                productId: productId
            })
            return res.status === 200

        } catch (error) {
            if (isAxiosError(error)) {
                return error.response.data.message
            }
        }
    },

}

export default api