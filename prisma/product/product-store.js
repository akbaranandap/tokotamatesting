import { ProductReq, ProductImageReq, ProductImage } from "./product-model"
import { ReviewReq, Review } from "../review/review-model"
import prisma from "../client"
import fs from 'fs'
import path from "path"

const store = {

    /**
     * 
     * @param {ProductReq} product 
     */
    async createProduct(product) {
        try {
            return prisma.product.create({
                data: {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    categoryId: product.categoryId
                }
            })
        } catch (error) {
            throw Error(`Error creating product: ${error.message}`)
        }
    },

    async getProductById(productId) {
        try {
            return await prisma.product.findUnique({
                where: { id: productId },
                include: {
                    reviews: true,
                    image: {
                        include: {
                            File: true
                        }
                    },
                    category: true
                }
            });
        } catch (error) {
            throw Error(`Error fetching product: ${error.message}`)
        }
    },

    async getProductByCategory() {
        try {
            return prisma.productCategory.findMany({
                include: {
                    Product: {
                        include: {
                            image: {
                                include: {
                                    File: true
                                },
                                take: 1
                            }
                        }
                    }
                }
            })
        } catch (error) {
            throw Error(`Error fetching all product: ${error.message}`)
        }
    },

    async getProductIds() {
        try {
            const ids = await prisma.product.findMany({
                select: {
                    id: true
                }
            })
            
            return ids
        } catch (error) {
            throw Error(`Error fetching all product ids: ${error.message}`)
        }
    },

    /**
     * 
     * @param {number} productId 
     * @param {ProductReq} updatedProduct 
     * @returns 
     */
    async updateProduct(productId, updatedProduct) {
        try {
            return await prisma.product.update({
                where: { id: productId },
                data: updatedProduct,
            });
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    },

    /**
     * 
     * @param {number} productId 
     * @returns 
     */
    async deleteProduct(productId) {
        try {
            const prodImgs = await prisma.productImage.findMany({
                where: {
                    productId: productId
                }
            })

            await prisma.productImage.deleteMany({
                where: {
                    productId: productId
                }
            })

            await prisma.file.deleteMany({
                where: {
                    id: {
                        in: prodImgs.map(el => el.fileId)
                    }
                }
            })

            await prisma.cartProduct.deleteMany({
                where: {
                    productId: productId
                }
            })

            await prisma.review.deleteMany({
                where: {
                    productId: productId
                }
            })

            return await prisma.product.delete({
                where: { id: productId },

            });
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    },

    /**
     * 
     * @param {ProductImageReq} productImage 
     * @returns {Review}
     */
    async addImage(productImage) {
        try {
            return await prisma.productImage.create({
                data: {
                    fileId: productImage.fileId,
                    productId: productImage.productId,
                    featured: productImage.featured
                }
            });
        } catch (error) {
            throw Error(`Error adding product image: ${error.message}`)
        }
    },

    /**
     * 
     * @param {number} id 
     * @param {ProductImageReq} updatedImage 
     * @returns 
     */
    async updateImage(id, updatedImage) {
        try {
            return await prisma.productImage.update({
                where: { id: id },
                data: updatedImage,
            });
        } catch (error) {
            throw new Error(`Error updating product image: ${error.message}`);
        }
    },

    /**
     * @returns {ProductImage[]}
     */
    async getFeaturedProductImage() {
        try {
            return await prisma.productImage.findMany({
                where: { featured: true },
                include: {
                    File: true
                }
            });
        } catch (error) {
            throw new Error(`Error fetching featured product image: ${error.message}`);
        }
    },

    /**
     * 
     * @param {number} imageId 
     * @returns {Review}
     */
    async deleteImage(imageId) {
        try {
            const productImage = await prisma.productImage.delete({
                where: { id: imageId },
            });
            
            const file = await prisma.file.delete({
                where: { id: productImage.fileId }
            })

            const ppath = path.join(process.cwd(), '/public', file.path)
            if (fs.existsSync(ppath)) fs.unlinkSync(ppath)

            return productImage
        } catch (error) {
            throw new Error(`Error deleting product image: ${error.message}`);
        }
    },

    /**
     * 
     * @param {ReviewReq[]} productReviews 
     * @returns {Review}
     */
    async addReviews(productReviews) {
        try {
            return await prisma.review.createMany({
                data: productReviews
            });
        } catch (error) {
            throw Error(`Error adding product reviews: ${error.message}`)
        }
    },

    /**
     * 
     * @param {number} id 
     * @param {ReviewReq} updatedReview 
     * @returns 
     */
    async updateReview(id, updatedReview) {
        try {
            return await prisma.review.update({
                where: { id: id },
                data: updatedReview,
            });
        } catch (error) {
            throw new Error(`Error updating product review: ${error.message}`);
        }
    },

    /**
     * 
     * @param {number} reviewId 
     * @returns {Review}
     */
    async deleteReview(reviewId) {
        try {
            return await prisma.review.delete({
                where: { id: reviewId },
            });

        } catch (error) {
            throw new Error(`Error deleting product review: ${error.message}`);
        }
    },

    async getProductsFromCart(userId) {
        try {
            const cart = await prisma.cart.findUnique({
                where: {
                    userId: userId
                }
            })

            return await prisma.cartProduct.findMany({
                where: {
                    cartId: cart.id
                },
                include: {
                    product: {
                        include: {
                            image: {
                                include: {
                                    File: true
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            throw new Error(`Error fetching cart product: ${error.message}`);
        }
    },

    async addToCart(productId, userId) {
        try {
            const cart = await prisma.cart.upsert({
                where: {
                    userId: userId
                },
                update: {
                    userId: userId
                },
                create: {
                    userId: userId
                }
            })

            const cartProduct = await prisma.cartProduct.findFirst({
                where: {
                    productId: productId,
                    cartId: cart.id
                }
            })

            if (!cartProduct) {
                return await prisma.cartProduct.create({
                    data: {
                        cartId: cart.id,
                        productId: productId
                    }
                })
            }
        } catch (error) {
            throw new Error(`Error adding product to cart: ${error.message}`);
        }
    },

    async deleteProductFromCart(productId, userId) {
        try {
            const cart = await prisma.cart.findUnique({
                where: {
                    userId: userId
                }
            })

            return await prisma.cartProduct.delete({
                where: {
                    productId_cartId: {
                        cartId: cart.id,
                        productId: productId
                    }
                }
            })

        } catch (error) {
            throw new Error(`Error deleting product from cart: ${error.message}`);
        }
    }
}

export default store