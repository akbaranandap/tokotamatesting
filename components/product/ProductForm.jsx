"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Dropdown, Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"
import CategoryAPI from '@/api/category'
import ProductAPI from '@/api/product'
import { Category } from "@/prisma/category/category-model"
import { ProductReq } from "@/prisma/product/product-model"
import { useRouter } from "next/router"
import { Review } from "@/prisma/review/review-model"

const Props = {
    product: {}
}
/**
 * 
 * @param {Props} props 
 * @returns 
 */
export default function ProductForm(props) {
    /**
     * @type {[Category, function]}
     */
    const [selectedCategory, selectCategory] = useState(
        props.product
            ? props.product.category
            : {}
    )

    /**
     * @type {[Review[], function]}
     */
    const [productReviews, setProductReviews] = useState(
        props.product
            ? props.product.reviews
            : []
    )
    const [selectedImages, setImages] = useState([])
    const [selectedFiles, setFiles] = useState([])
    const [productImages, setProductImages] = useState(
        props.product
            ? props.product.image
            : []
    )
    const [category, setCategory] = useState('')
    const [newCategory, setNewCategory] = useState(false)
    const [name, setName] = useState(props.product ? props.product.name : '')
    const [price, setPrice] = useState(props.product ? props.product.price : '')
    const [description, setDescription] = useState(props.product ? props.product.description : '')
    const [reviews, setReviews] = useState([])
    const [show, setShow] = useState(false)
    const [tobeDeletedCategory, setCategoryToDelete] = useState()

    const router = useRouter()

    /**
     * @type {[Category[], function]}
     */
    const [categories, setCategories] = useState([])

    async function getAllCategories() {
        const categories = await CategoryAPI.getAllCategory()
        setCategories(categories)
    }

    useEffect(() => {
        getAllCategories()
        console.log(props.product);
    }, [])

    const addReview = (e) => {
        e.preventDefault()
        setReviews([...reviews, { name: '', review: '' }]);
    };

    const removeReview = (e, index) => {
        e.preventDefault()
        const newReviews = [...reviews];
        newReviews.splice(index, 1);
        setReviews(newReviews);
    };

    const handleNameChange = (index, event) => {
        const newReviews = [...reviews];
        newReviews[index].name = event.target.value;
        setReviews(newReviews);
    };

    const handleReviewChange = (index, event) => {
        const newReviews = [...reviews];
        newReviews[index].review = event.target.value;
        setReviews(newReviews);
    };

    function removeImage(i) {
        setFiles(selectedFiles.filter((_, j) => j !== i))
        setImages(selectedImages.filter((_, j) => j !== i))
    }

    async function deleteProductImage(id) {
        const deleted = await ProductAPI.deleteProductImage(id)
        if (deleted) {
            setProductImages(productImages.filter(img => img.id !== id))
        }
    }

    async function createProduct(e) {
        e.preventDefault()

        if (!selectedCategory) {
            router.push({
                pathname: '/admin/product' + `${router.query.id ? `/${router.query.id}` : ''}`,
                query: { message: 'Product category is required', alert: 'danger' }
            })
            return
        }

        if (!name) {
            router.push({
                pathname: '/admin/product' + `${router.query.id ? `/${router.query.id}` : ''}`,
                query: { message: 'Product name is required', alert: 'danger' }
            })
            return
        }

        if (!description) {
            router.push({
                pathname: '/admin/product' + `${router.query.id ? `/${router.query.id}` : ''}`,
                query: { message: 'Product description is required', alert: 'danger' }
            })
            return
        }



        /**
         * @type {ProductReq}
         */
        const product = {
            name,
            description,
            price,
            categoryId: selectedCategory.id
        }

        let res
        if (!router.query.id) {
            res = await ProductAPI.createProduct(product)
        } else {
            res = await ProductAPI.editProduct(product, parseInt(router.query.id))
        }

        if (typeof res === 'string') {
            router.push({
                pathname: '/admin/product',
                query: { message: res, alert: 'danger' }
            })
            return
        }

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = new FormData()
            file.append('file', selectedFiles[i])
            const uploaded = await ProductAPI.uploadImage(file)
            if (typeof uploaded === 'string') {
                router.push({
                    pathname: '/admin/product' + `${router.query.id ? `/${router.query.id}` : ''}`,
                    query: { message: uploaded, alert: 'danger' }
                })
                return
            }

            const productImage = await ProductAPI.createProductImage({
                featured: false,
                fileId: uploaded.id,
                productId: res.id,
            })

            if (typeof productImage === 'string') {
                router.push({
                    pathname: '/admin/product' + `${router.query.id ? `/${router.query.id}` : ''}`,
                    query: { message: uploaded, alert: 'danger' }

                })
                return
            }
        }

        if (productReviews.length > 0) {
            const toUpdateReviews = productReviews.map(review => {
                return {
                    id: review.id,
                    name: review.name,
                    review: review.review,
                    productId: res.id
                }
            })

            const updatedReviews = await ProductAPI.updateReviews(toUpdateReviews)
            if (typeof updatedReviews === 'string') {
                router.push({
                    pathname: '/admin/product' + `${router.query.id ? `/${router.query.id}` : ''}`,
                    query: { message: updatedReviews, alert: 'danger' }
                })

                return
            }
        }

        const toCreateReviews = reviews.map(review => {
            return {
                name: review.name,
                review: review.review,
                productId: res.id
            }
        })

        const createdReviews = await ProductAPI.addReviews(toCreateReviews)
        if (typeof createdReviews === 'string') {
            router.push({
                pathname: '/admin/product' + `${router.query.id ? `/${router.query.id}` : ''}`,
                query: { message: createdReviews, alert: 'danger' }
            })

            return
        }

        router.push({ pathname: '/admin', query: { message: 'Success', alert: 'success' } })
    }

    async function createCategory(e) {
        e.preventDefault()
        const createdCategory = await CategoryAPI.createCategory({ name: category })
        setCategories(categories => [...categories, createdCategory])
        setNewCategory(!newCategory)
    }

    async function deleteProductReview(e, id) {
        e.preventDefault()
        await ProductAPI.deleteReview(id)
        setProductReviews(productReviews.filter(review => review.id !== id))
    }

    const handleNameChangeProductReview = (index, event) => {
        const newReviews = [...productReviews];
        newReviews[index].name = event.target.value;
        setProductReviews(newReviews);
    };

    const handleReviewChangeProductReview = (index, event) => {
        const newReviews = [...productReviews];
        newReviews[index].review = event.target.value;
        setProductReviews(newReviews);
    };

    async function openDeleteCategory(category) {
        setCategoryToDelete(category)
        if (props.product && props.product.categoryId === category.id) {
            router.push({
                pathname: '/admin/product' + `${router.query.id ? `/${router.query.id}` : ''}`,
                query: { message: `Cannot delete category ${category.name}. This product is related to ${category.name}`, alert: 'danger' }
            })  
            return  
        }

        setShow(true)
    }

    async function deleteCategory() {
        await CategoryAPI.deleteCategory(tobeDeletedCategory.id)
        setCategories(categories.filter(cat => cat.id !== tobeDeletedCategory.id))
        setShow(false)
    }

    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    <Modal.Title>Are you sure?</Modal.Title>
                    <p>{ tobeDeletedCategory?.name || 'asu' } is about to be deleted forever. <b>Make sure to delete or change all related product to this category</b></p>
                    <div className='d-flex gap-2 justify-content-end mt-3'>
                        <Button variant="ghost" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => deleteCategory()}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <form onSubmit={createProduct} className="row d-flex justify-content-between">
                <div className="col-12 col-lg-4">
                    <div className="d-flex justify-content-between">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                {selectedCategory?.name || 'Product Category'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {categories.map(el => {
                                    return <Dropdown.Item key={el.id}>
                                        <div className="row">
                                            <div className="col-8" onClick={() => selectCategory(el)}>
                                                <span className="w-auto h-auto">{el.name}</span>
                                            </div>
                                            <div className="col-4" onClick={() => openDeleteCategory(el)} >
                                                <div className="ms-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick={() => setNewCategory(!newCategory)}>Add Category</Button>
                    </div>
                    {newCategory ? (
                        <div className="input-group flex-nowrap mt-2">
                            <span className="input-group-text" id="addon-wrapping">Category</span>
                            <input value={category} onChange={e => setCategory(e.target.value)} type="text" className="form-control" placeholder="Keyboard" aria-label="Category" aria-describedby="addon-wrapping" />
                            <Button onClick={createCategory}>Save</Button>
                        </div>
                    ) : (<div></div>)}
                    <div className="d-flex flex-column">
                        {productImages.map((image, i) => {
                            return (
                                <div key={i}>
                                    <img src={image.File.path || '/coro.jpg'} className="mt-3" style={{ width: '100%' }} />
                                    <Button
                                        className="btn btn-danger mt-1"
                                        style={{ width: '100%' }}
                                        onClick={() => deleteProductImage(image.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )
                        })}
                        {selectedImages.map((image, i) => {
                            return (
                                <div key={i}>
                                    <img src={image || '/coro.jpg'} className="mt-3" style={{ width: '100%' }} />
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
                    </div>
                </div>

                <div className="col-12 col-lg-7 mt-3 mt-lg-0 d-flex flex-column gap-3">
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Name</span>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Mechanical Keyboard" aria-label="Category" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Rp</span>
                        <input value={price} onChange={e => setPrice(e.target.value)} type="text" className="form-control" placeholder="120.000" aria-label="Category" aria-describedby="addon-wrapping" />
                    </div>
                    <div className="input-group d-flex flex-column gap-1">
                        <label htmlFor="description">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="rounded border form-control" rows="10" id="description" aria-label="Description" style={{ width: '100%' }}></textarea>
                    </div>

                    <div>
                        <Button onClick={addReview}>Add Review</Button>
                        {productReviews.map((el, i) => {
                            return (
                                <div key={i} className='d-flex flex-row gap-2 align-items-start mt-2'>
                                    <Image src='/person.png' width={50} height={50} alt="review"></Image>
                                    <div>
                                        <div className="input-group flex-nowrap">
                                            <span className="input-group-text" id="addon-wrapping">Name</span>
                                            <input onChange={e => handleNameChangeProductReview(i, e)} value={el.name} type="text" className="form-control" placeholder="John Doe" aria-label="Category" aria-describedby="addon-wrapping" />
                                        </div>
                                        <div className="input-group flex-nowrap mt-2">
                                            <span className="input-group-text" id="addon-wrapping">Review</span>
                                            <input onChange={e => handleReviewChangeProductReview(i, e)} value={el.review} type="text" className="form-control" placeholder="Very Nice" aria-label="Category" aria-describedby="addon-wrapping" />
                                        </div>
                                    </div>
                                    <Button onClick={(e) => deleteProductReview(e, el.id)} className="btn btn-danger">Remove</Button>
                                </div>
                            )
                        })}
                        {reviews.map((el, i) => {
                            return (
                                <div key={i} className='d-flex flex-row gap-2 align-items-start mt-2'>
                                    <Image src='/person.png' width={50} height={50} alt="review"></Image>
                                    <div>
                                        <div className="input-group flex-nowrap">
                                            <span className="input-group-text" id="addon-wrapping">Name</span>
                                            <input onChange={e => handleNameChange(i, e)} value={el.name} type="text" className="form-control" placeholder="John Doe" aria-label="Category" aria-describedby="addon-wrapping" />
                                        </div>
                                        <div className="input-group flex-nowrap mt-2">
                                            <span className="input-group-text" id="addon-wrapping">Review</span>
                                            <input onChange={e => handleReviewChange(i, e)} value={el.review} type="text" className="form-control" placeholder="Very Nice" aria-label="Category" aria-describedby="addon-wrapping" />
                                        </div>
                                    </div>
                                    <Button onClick={(e) => removeReview(e, i)} className="btn btn-danger">Remove</Button>
                                </div>
                            )
                        })}
                    </div>

                    <Button className="mt-4" onClick={createProduct}>Save</Button>
                </div>
            </form>
        </div>
    )
}