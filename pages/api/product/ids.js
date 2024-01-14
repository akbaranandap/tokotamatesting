import store from '@/prisma/product/product-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'GET') return getProductIds(req, res)

    res.setHeader("Allow", ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
}


/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function getProductIds(req, res) {
    try {
        const productIds = await store.getProductIds()
        return res.status(200).json(productIds)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}