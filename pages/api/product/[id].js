import store from '@/prisma/product/product-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'GET') return getProduct(req, res)
    if (method === 'PUT') return updateProduct(req, res)
    if (method === 'DELETE') return deleteProduct(req, res)

    res.setHeader("Allow", ["GET", 'PUT', "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function getProduct(req, res) {
    try {
        const id  = parseInt(req.query.id)
        const product = await store.getProductById(id)
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
async function updateProduct(req, res) {
    try {
        const id  = parseInt(req.query.id)
        const product = await store.updateProduct(id, req.body)
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
async function deleteProduct(req, res) {
    try {
        const id  = parseInt(req.query.id)
        const product = await store.deleteProduct(id)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}