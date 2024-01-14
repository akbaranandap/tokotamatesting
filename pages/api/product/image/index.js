import store from '@/prisma/product/product-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'POST') return createProductImage(req, res)

    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function createProductImage(req, res) {
    try {
        const productImage = await store.addImage(req.body)
        return res.status(201).json(productImage);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
