import Main from '@/components/Main'
import Carousel from 'react-bootstrap/Carousel';
import ProductList from '@/components/product/ProductList'
import ProductAPI from '@/api/product'

export async function getStaticProps() {
    const featuredProductImages = await ProductAPI.getFeaturedProductImage()

    return {
        props: {
            featuredProductImages: typeof featuredProductImages !== 'string' ? featuredProductImages : {}
        },
    }
}

export default function Home(props) {
    return (
        <Main title='Home' description='Home description'>
            <div className='container'>
                <Carousel className='bg-primary' >
                    {props.featuredProductImages.map((el, i) => {
                        return (
                            <Carousel.Item key={i} style={{ height: '15rem' }} >
                                <img src={el.File.path} alt="" style={{ width: '100%' }}/>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>

            <ProductList />
        </Main>
    )
}