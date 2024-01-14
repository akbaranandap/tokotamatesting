import store from '@/prisma/product/product-store';
import { ReviewReq } from '@/prisma/review/review-model';


/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'POST') return createProductReviews(req, res)
    if (method === 'PUT') return updateProductReview(req, res)

    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function createProductReviews(req, res) {
    try {
        const productReview = await store.addReviews(req.body)
        return res.status(201).json(productReview);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function updateProductReview(req, res) {
    try {
        /**
         * @type {ReviewReq[]}
         */
        const productReviews = req.body
        for (let i = 0; i < productReviews.length; i++) {
            await store.updateReview(productReviews[i].id)
        }
        return res.status(200).json(productReview);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

