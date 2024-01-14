import { Category, ProductCategoryReq } from "./category-model"
import prisma from "../client"
import product from '../product/product-store'

const store = {

    /**
     * 
     * @param {ProductCategoryReq} category 
     * @returns 
     */
    async createCategory(category) {
        try {
            return await prisma.productCategory.create({
                data: {
                    name: category.name,
                },
            });
        } catch (error) {
            throw new Error(`Error creating category: ${error.message}`);
        }
    },

    /**
     * 
     * @returns {Category[]}
     */
    async getAll() {
        try {
            const res = await prisma.productCategory.findMany();
            return res
        } catch (error) {
            throw new Error(`Error fetching category: ${error.message}`);
        }
    },

    /**
     * 
     * @param {ProductCategoryReq} category 
     * @returns 
     */
    async updateCategory(categoryId, category) {
        try {
            return await prisma.productCategory.update({
                where: { id: categoryId },
                data: category,
            });
        } catch (error) {
            throw new Error(`Error updating category: ${error.message}`);
        }
    },

    async deleteCategory(categoryId) {
        try {
            const category = await prisma.productCategory.findUnique({
                where: { id: categoryId },
                include: {
                    Product: {
                        select: { id: true }
                    }
                }
            });

            category.Product.forEach(async prod => {
                await product.deleteProduct(prod.id)
            })

            return await prisma.productCategory.delete({
                where: {
                    id: categoryId
                }
            })
        } catch (error) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    },
}

export default store