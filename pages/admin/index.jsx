import Main from '@/components/Main'
import Products from '@/components/product/ProductAdmin'
import Link from 'next/link'
import { Button, Carousel } from 'react-bootstrap'
import ProductAPI from '@/api/product'
import { ProductImage } from '@/prisma/product/product-model'

export async function getStaticProps() {
    const featuredProductImages = await ProductAPI.getFeaturedProductImage()

    return {
        props: {
            featuredProductImages: typeof featuredProductImages !== 'string' ? featuredProductImages : {}
        },
    }
}

/**
 * 
 * @param {{ featuredProductImages: ProductImage[] }} props 
 * @returns 
 */
export default function Product(props) {
    return (
        <Main title='Home' description='Home description'>
            <div className="container my-2">
                <h4>Featured Product</h4>
                <Carousel className='mb-3' >
                    {props.featuredProductImages.map((el, i) => {
                        return (
                            <Carousel.Item key={i} style={{ height: '15rem' }} >
                                <img src={el.File.path} alt="" style={{ width: '100%' }}/>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>

                <div className='d-flex gap-2'>
                    <Link href='/admin/product/featured'>
                        <Button className='btn btn-primary'>Add Featured Product</Button>
                    </Link>
                    <Link href='/admin/product/create'>
                        <Button className='btn btn-primary'>Add Product</Button>
                    </Link>
                </div>

                <Products />
            </div>
        </Main>
    )
}