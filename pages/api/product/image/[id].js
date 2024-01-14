import store from '@/prisma/product/product-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'DELETE') return deleteProductImage(req, res)

    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function deleteProductImage(req, res) {
    try {
        const productImage = await store.deleteImage(parseInt(req.query.id))
        return res.status(200).json(productImage);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
