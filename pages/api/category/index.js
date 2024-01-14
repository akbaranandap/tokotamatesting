import store from '@/prisma/category/category-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'GET') return getAll(req, res)
    if (method === 'POST') return create(req, res)

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
        const product = await store.createCategory(req.body)
        return res.status(200).json(product)
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
async function getAll(req, res) {
    try {
        const categories = await store.getAll(req.body)
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}