import store from "@/prisma/user/user-store";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'POST') return signup(req, res)

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function signup(req, res) {
    try {
        const { username, email, password } = req.body

        const user = await store.createUser({ username, email, password })
        if (user) {
            return res.status(200).json(user)
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}