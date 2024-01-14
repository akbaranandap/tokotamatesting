import { CreateReq, User } from "./user-model"
import prisma from "../client"
import bcrypt from 'bcrypt'

async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds to use (recommended value)
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function isSame(password, hashed) {
    return bcrypt.compare(password, hashed)
}

const store = {
    /**
     * 
     * @param {CreateReq} data 
     * @returns {User} 
     */
    async createUser(data) {
        try {
            return await prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: await hashPassword(data.password),
                }
            })
        } catch (error) {
            throw Error(`Error creating user: ${error.message}`)
        }
    },
    
    async getUser(id) {
        try {
            return await prisma.user.findFirst({ 
                where: { id: id },
            })
        } catch (error) {
            throw Error(`Error fetching user: ${error.message}`)
        }
    },

    /**
     * @param {string} email 
     * @param {string} password 
     * @returns {user} 
     */
    async login(email, password) {
        try {
            const user = await prisma.user.findFirst({ where: {
                email: email
            }})

            if (!user) {
                throw new Error("User not found")
            }

            if (await isSame(password, user.password)) {
                return user
            }

            throw new Error("User not found")
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    },
    async countUser() {
        try {
            return await prisma.user.count()
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }
}

export default store