import store from '@/prisma/product/product-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'GET') return getFeaturedProductImage(req, res)

    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function getFeaturedProductImage(req, res) {
    try {
        const productImage = await store.getFeaturedProductImage()
        return res.status(200).json(productImage);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
