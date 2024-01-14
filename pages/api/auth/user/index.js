import store from '@/prisma/user/user-store';
import jwt from 'jsonwebtoken'

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'GET') return getUser(req, res)

    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

export async function getUserAuth(req) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader.replace('Bearer ', '')
        const json = jwt.verify(token, process.env.JWT_SECRET)
    
        if (json.user) {
            const user = await store.getUser(json.user)
            delete user.password
    
            if (user.isAdmin === undefined) {
                user.isAdmin = false
            }
    
            return user
        }
        
    } catch (error) {
        return null
    }
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function getUser(req, res) {
    const user = await getUserAuth(req)
    if (user) {
        return res.status(200).json(user)
    }

    return res.status(401).json({
        message: 'unauthorized'
    })
}