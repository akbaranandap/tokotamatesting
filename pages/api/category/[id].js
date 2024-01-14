import store from '@/prisma/category/category-store';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'DELETE') return deleteCategory(req, res)

    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function deleteCategory(req, res) {
    try {
        const category = await store.deleteCategory(parseInt(req.query.id))
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
