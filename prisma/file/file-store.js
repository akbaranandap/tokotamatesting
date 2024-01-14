import prisma from "../client"
import { File, ProductImage, ProductImageReq } from "./file-model"


const store = {

    /**
     * 
     * @param {string} path
     * @returns {File}
     */
    async createFile(path) {
        try {
            console.log('upload', path);
            return prisma.file.create({
                data: { path }
            })
        } catch (error) {
            throw Error(`Error creating file: ${error.message}`)
        }
    },

    /**
     * 
     * @param {number} id
     * @param {string} path
     * @returns {File}
     */
    async updateFile(id, path) {
        try {
            return prisma.file.update({
                where: { id: id },
                data: { path }
            })
        } catch (error) {
            throw Error(`Error creating file: ${error.message}`)
        }
    },

    /**
     * 
     * @param {number} fileId 
     * @returns {File}
     */
    async deleteFile(fileId) {
        try {
            return await prisma.file.delete({
                where: { id: fileId }
            });
        } catch (error) {
            throw Error(`Error deleting file: ${error.message}`)
        }
    },
}

export default store