import store from '@/prisma/product/product-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'DELETE') return deleteProductReview(req, res)

    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function deleteProductReview(req, res) {
    try {
        const productReview = await store.deleteReview(parseInt(req.query.id))
        return res.status(200).json(productReview);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
