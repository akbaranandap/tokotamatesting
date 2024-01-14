"use client"
import ProductAPI from '@/api/product'
import { ProductCategory } from '@/prisma/category/category-model'
import { Product } from '@/prisma/product/product-model'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';

export default function ProductsAdmin() {
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

    /**
     * 
     * @param {Product} product 
     */
    function openDeleteDialog(product) {
        selectProduct(product)
        setShow(true)
    }

    async function deleteProduct() {
        const deleted = await ProductAPI.deleteProduct(selectedProduct.id)
        if (deleted) {
            setProductCategories(productCategories => [ ...productCategories.map(categories => {
                return {
                    ...categories,
                    Product: categories.Product.filter(product => product.id !== selectedProduct.id)
                }
            })])
            setShow(false)
        }
    }

    return (
        <div className='container mt-4 d-flex flex-column gap-5'>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    <Modal.Title>Are you sure?</Modal.Title>
                    { selectedProduct?.name || 'asu' } is about to be deleted forever. Are you sure?
                    <div className='d-flex gap-2 justify-content-end mt-3'>
                        <Button variant="ghost" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => deleteProduct()}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {productCategories.map(category => {
                return (
                    category.Product.length !== 0 ? (
                        <div key={category.id}>
                            <h5 className='fw-semibold'>{category.name}</h5>
                            <div className='d-flex flex-row gap-4 overflow-x-auto hide-scrollbar'>
                                {category.Product.map(product => {
                                    return (
                                        <div key={product.id} className='d-flex flex-column gap-1'>
                                            <Link href={`/admin/product/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                                <img src={product.image[0]?.File.path || '/cato.jpeg'} alt="product-img" className='rounded' style={{ width: '10rem', height: '10rem', objectFit: 'cover', float: 'left' }} />
                                            </Link>
                                            <Button onClick={() => openDeleteDialog(product)} className='btn btn-danger'>Delete</Button>
                                            <Link href={`/admin/product/${product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
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