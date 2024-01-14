"use client"
import ProductAPI from '@/api/product'
import { ProductCategory } from '@/prisma/category/category-model'
import { Product } from '@/prisma/product/product-model'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

export default function Products() {
    /**
     * @type {[ProductCategory[], function]}
     */
    const [productCategories, setProductCategories] = useState([])
    
    /**
     * @type {[Product, function]}
     */
    const [selectedProduct, selectProduct] = useState()

    async function getAllProducts() {
        const res = await ProductAPI.getAllProduct()
        setProductCategories(res)
    }

    const [show, setShow] = useState(false);

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div className='container mt-4 d-flex flex-column gap-5'>
            {productCategories.map(category => {
                return (
                    category.Product.length !== 0 ? (
                        <div key={category.id}>
                            <h5 className='fw-semibold'>{category.name}</h5>
                            <div className='d-flex flex-row gap-4 overflow-x-auto hide-scrollbar'>
                                {category.Product.map(product => {
                                    return (
                                        <div key={product.id} className='d-flex flex-column gap-1'>
                                            <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                                <img src={product.image[0]?.File.path} alt="product-img" className='rounded' style={{ width: '10rem', height: '10rem', objectFit: 'cover', float: 'left' }} />
                                            </Link>
                                            <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                                <h6 className='text-black'>{product.name}</h6>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : ('')
                )

            })}
        </div>
    )
}