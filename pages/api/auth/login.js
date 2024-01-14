import store from "@/prisma/user/user-store";
import jwt from 'jsonwebtoken'

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'POST') return login(req, res)

    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await store.login(email, password)
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }

        return res.status(200).json({
            token: jwt.sign(
                { user: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}