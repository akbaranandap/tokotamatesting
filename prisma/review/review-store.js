import { UpsertReview } from "./review-model"
import prisma from "../client"


const store = {

    /**
     * 
     * @param {UpsertReview} review 
     * @returns 
     */
    async upsertReview(review) {
        try {
            return await prisma.review.upsert({
                where: {
                    id: review.id
                },
                update: {
                    name: review.name,
                    review: review.review,
                    star: review.star,
                },
                create: {
                    name: review.name,
                    review: review.review,
                    star: review.star,
                },
            });
        } catch (error) {
            throw new Error(`Error upserting review: ${error.message}`);
        }
    },


    /**
     * 
     * @param {number} reviewId 
     * @returns 
     */
    async deleteReview(reviewId) {
        try {
            return await prisma.review.delete({
                where: { id: reviewId },
            });
        } catch (error) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }
}

export default store