import store from '@/prisma/user/user-store';
import jwt from 'jsonwebtoken'
import { errorToJSON } from 'next/dist/server/render';

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'GET') return count(req, res)

    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function count(req, res) {
    try {
        const users = await store.countUser()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}