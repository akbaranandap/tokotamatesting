import store from '@/prisma/product/product-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'POST') return create(req, res)
    if (method === 'GET') return getProductByCategory(req, res)

    res.setHeader("Allow", ["POST", 'GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function create(req, res) {
    try {
        const product = await store.createProduct(req.body)
        return res.status(201).json(product)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function getProductByCategory(req, res) {
    try {
        const product = await store.getProductByCategory(req.body)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}