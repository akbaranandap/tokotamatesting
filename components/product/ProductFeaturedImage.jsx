import { ProductImage } from "@/prisma/product/product-model"
import { useState } from "react"
import { Button } from "react-bootstrap"
import ProductAPI from '@/api/product'
import { useRouter } from "next/router"

class Props {

    /**
     * @param {ProductImage} images 
     */
    constructor(images) {
        this.images = images
    }
}

/**
 * 
 * @param {Props} props 
 * @returns 
 */
export default function FeaturedImages(props) {

    const router = useRouter()

    const [featuredImages, setFeaturedImages] = useState(
        props.images 
            ? props.images
            : []
    )
    const [selectedImages, setImages] = useState([])
    const [selectedFiles, setFiles] = useState([])

    function removeImage(i) {
        setFiles(selectedFiles.filter((_, j) => j !== i))
        setImages(selectedImages.filter((_, j) => j !== i))
    }

    async function deleteImage(id) {
        const deleted = await ProductAPI.deleteProductImage(id)
        if (deleted) {
            setFeaturedImages(featuredImages.filter(img => img.id !== id))
        }
    }

    async function save(e) {
        e.preventDefault()
        
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = new FormData()
            file.append('file', selectedFiles[i])
            const uploaded = await ProductAPI.uploadImage(file)
            if (typeof uploaded === 'string') {
                router.push({
                    pathname: router.pathname,
                    query: { message: uploaded, alert: 'danger' }
                })
                return
            }

            const productImage = await ProductAPI.createProductImage({
                featured: true,
                fileId: uploaded.id,
            })

            if (typeof productImage === 'string') {
                router.push({
                    pathname: router.pathname,
                    query: { message: uploaded, alert: 'danger' }
                })
                return
            }
        }

        router.push({ pathname: '/admin', query: { message: 'Success', alert: 'success' }})
    }

    return (
        <form onSubmit={save}>
            {featuredImages.map((image, i) => {
                return (
                    <div key={i}>
                        <img src={image.File.path} className="mt-3" style={{ width: '100%' }} />
                        <Button
                            className="btn btn-danger mt-1"
                            style={{ width: '100%' }}
                            onClick={() => deleteImage(image.id)}
                        >
                            Remove
                        </Button>
                    </div>
                )
            })}
            {selectedImages.map((image, i) => {
                return (
                    <div key={i}>
                        <img src={image} className="mt-3" style={{ width: '100%' }} />
                        <Button
                            className="btn btn-danger mt-1"
                            style={{ width: '100%' }}
                            onClick={() => removeImage(i)}
                        >
                            Remove
                        </Button>
                    </div>
                )
            })}
            <div className="input-group mt-3">
                <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={({ target }) => {
                        if (target.files) {
                            const file = target.files[0]
                            setImages(images => [...images, URL.createObjectURL(file)])
                            setFiles(files => [...files, file])
                        }
                    }}
                />
            </div>

            <Button type="submit" className="btn btn-primary mt-2" style={{ width: '100%'}}>Save</Button>
        </form>
    )
}