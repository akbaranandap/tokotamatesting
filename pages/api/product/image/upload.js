import store from '@/prisma/file/file-store';
import formidable from 'formidable';
import path from "path";

export const config = {
    api: {
        bodyParser: false
    }
};


/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
export default function handler(req, res) {
    const { method } = req

    if (method === 'POST') return upload(req, res)

    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
}

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 * @returns 
 */
async function upload(req, res) {
    try {
        const options = {}
        options.uploadDir = path.join(process.cwd(), '/public/product/')
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename.split(' ').join('-')
        }
        
        const formdata = await readFile(req, options)
        const filepath = path.join('/product/', path.basename(formdata.files.file[0].filepath))
        const file = await store.createFile(filepath)
        
        return res.status(201).json(file);
    } catch (error) {
        console.log(error.message2);
        return res.status(500).json({message: error.message})
    }
}

function readFile(req, options) {
    const form = formidable(options)
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({fields, files})
        })
    })
}