import store from '@/prisma/product/product-store';
import { getUserAuth } from '../../auth/user';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'POST') return addProductToCart(req, res)
    if (method === 'GET') return getProductsFromCart(req, res)

    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function addProductToCart(req, res) {
    try {
        const user = await getUserAuth(req)
        if (user) {
            const { productId } = req.body
            const productCart = await store.addToCart(productId, user.id)
            return res.status(201).json(productCart);
        }

        return res.status(401).json({ message: 'unauthorized' })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function getProductsFromCart(req, res) {
    try {
        const user = await getUserAuth(req)
        if (user) {
            const productCart = await store.getProductsFromCart(user.id)
            return res.status(200).json(productCart);
        }

        return res.status(401).json({ message: 'unauthorized' })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
