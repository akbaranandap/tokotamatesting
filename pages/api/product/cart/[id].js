import store from '@/prisma/product/product-store';
import { getUserAuth } from '../../auth/user';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'DELETE') return deleteProductFromCart(req, res)

    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function deleteProductFromCart(req, res) {
    try {
        const user = await getUserAuth(req)
        if (user) {
            const productCart = await store.deleteProductFromCart(parseInt(req.query.id), user.id)
            return res.status(200).json(productCart);
        }

        return res.status(401).json({ message: 'unauthorized' })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
