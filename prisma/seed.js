const PrismaClient = require('@prisma/client').PrismaClient
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds to use (recommended value)
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function main() {
    await prisma.user.upsert({
        where: {
            email: 'admin@mail.com'
        },
        update: {
            username: 'admin',
            email: 'admin@mail.com',
            password: await hashPassword('admin123'),
            isAdmin: true,
            createdAt: new Date(),
        }, 
        create: {
            username: 'admin',
            email: 'admin@mail.com',
            password: await hashPassword('admin123'),
            isAdmin: true,
            createdAt: new Date(),
        }
    })
}

main()
    .then(async () => {
    await prisma.$disconnect()
}).catch(async err => {
    console.error(err);
    await prisma.$disconnect()
    process.exit(1)
})