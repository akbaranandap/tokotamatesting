"use client"

import Image from "next/image"
import ProductImages from '@/components/product/ProductImages';
import { useState } from "react"
import Markdown from "markdown-to-jsx";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import ProductAPI from '@/api/product'

const review = {
    name: '',
    review: ''
}
/**
 * 
 * @param {review} props 
 * @returns 
 */
function Review(props) {
    return (
        <div className='d-flex flex-row gap-2 align-items-start'>
            <Image src='/person.png' width={50} height={50} alt="profile"></Image>
            <div>
                <span className='fw-medium'>{props.name}</span>
                <p style={{ fontSize: 12 }}>{props.review}</p>
            </div>
        </div>
    )
}

export default function ProductItem(props) {
    const router = useRouter()

    const [productImages, setProductImages] = useState(
        props.product
            ? props.product.image.map(el => el.File.path)
            : []
    )

    const [name, setName] = useState(props.product ? props.product.name : '')
    const [price, setPrice] = useState(props.product ? props.product.price : 0)
    const [description, setDescription] = useState(props.product ? props.product.description : '')
    const [reviews, setReviews] = useState(
        props.product
            ? props.product.reviews
            : [{
                name: '',
                review: ''
            }])

    async function addToCart() {
        const res = await ProductAPI.addProductToCart(props.product.id)
        if (typeof res === 'string') {
            router.push({ pathname: `/product/${props.product.id}`, query: { message: res, alert: 'danger' }})
        } else {
            router.push({ pathname: `/product/${props.product.id}`, query: { message: `${name} has been added to cart`, alert: 'success' }})
        }
    }

    return (
        <div className="row d-flex justify-content-between">
            <div className="col-4">
                <ProductImages images={productImages}></ProductImages>
            </div>

            <div className="col-7">
                <div className='border-bottom'>
                    <div className="d-flex flex-row justify-content-end w-100">
                        <Button onClick={addToCart}>Add to Cart</Button>
                    </div>
                    <h2 className='fw-semibold'>{name || ''}</h2>
                    <h5>Rp. {price || 0}</h5>
                </div>

                <div className='mt-3'>
                    <p className='fw-medium'>Description</p>
                    <Markdown>{description}</Markdown>
                </div>

                <div className='mt-3'>
                    <p className='fw-medium'>Review</p>

                    {reviews.map((el, i) => {
                        return <Review key={el.id} name={el.name} review={el.review} ></Review>
                    })}
                </div>
            </div>
        </div>
    )
}