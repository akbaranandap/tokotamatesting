"use client"
import ProductAPI from '@/api/product'
import auth from '@/api/auth'
import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useRouter } from 'next/router'

export default function ProductCart() {
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [isBuying, setBuy] = useState(false)
    const [selectedProduct, selectProduct] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    async function getProductCart() {
        const res = await ProductAPI.getProductsFromCart()
        if (typeof res !== 'string') {
            const prds = res.map(el => el.product)
            setProducts(prds)
        }

        try {
            const res = await auth.user()
            if (res.status === 200) {
                setEmail(res.data.email)
            }
        } catch (error) {
            router.push('/login')
        }
    }

    useEffect(() => {
        getProductCart()
    }, [])

    /**
     * 
     * @param {Product} product 
     */
    function openDeleteDialog(product) {
        selectProduct(product)
        setShow(true)
    }

    async function deleteProductFromCart() {
        const deleted = await ProductAPI.deleteProductFromCart(selectedProduct.id)
        if (typeof deleted !== 'string') {
            setProducts(products.filter(el => el.id !== selectedProduct.id))
            setShow(false)
        }
    }

    function buy() {
        const url = `https://wa.me/${process.env.NEXT_PUBLIC_WA}`
        const param = new URLSearchParams()
        param.set('text', `Nama: ${name}\nNo Hp: ${phone}\nEmail: ${email}\nPesanan: ${products.map(el => el.name).join(', ')}`)

        window.location.replace(`${url}?${param.toString()}`)
    }

    return (
        <div className='container'>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    <Modal.Title>Are you sure?</Modal.Title>
                    {selectedProduct?.name || 'asu'} is about to be deleted forever. Are you sure?
                    <div className='d-flex gap-2 justify-content-end mt-3'>
                        <Button variant="ghost" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => deleteProductFromCart()}>
                            Delete
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={isBuying} onHide={() => setBuy(false)}>
                <Modal.Body>
                    <Modal.Title>Buying form</Modal.Title>
                    <form onSubmit={buy} className='d-flex flex-column gap-2 justify-content-end mt-3'>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Name</span>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Email</span>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" aria-label="Name" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">Phone</span>
                            <input value={phone} onChange={e => setPhone(e.target.value)} type="text" className="form-control" placeholder="Phone" aria-label="Name" aria-describedby="basic-addon1" />
                        </div>
                        <div className='ms-auto'>
                            <Button variant="ghost" onClick={() => setBuy(false)}>
                                Close
                            </Button>
                            <Button onClick={() => buy()}>
                                Buy
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <div className='d-flex flex-row justify-content-end'>
                <Button onClick={() => setBuy(true)} className='my-3'>Buy</Button>
            </div>

            {products.map((product, i) => {
                return (
                    <div key={i} className='d-flex flex-column gap-1' style={{ width: '10rem' }}>
                        <img src={product.image[0]?.File.path || '/cato.jpeg'} alt="product-img" className='rounded' style={{ width: '10rem', height: '10rem', objectFit: 'cover', float: 'left' }} />
                        <Button onClick={() => openDeleteDialog(product)} className='btn btn-danger' >Delete</Button>
                        <h6 className='text-black'>{product.name}</h6>
                    </div>
                )
            })}
        </div>
    )
}