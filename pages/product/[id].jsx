import Main from '@/components/Main'
import ProductItem from '@/components/product/ProductItem'
import ProductAPI from '@/api/product'

export async function getStaticPaths() {
    const res = await ProductAPI.getAllProductIds()

    let paths = res.length === 0 ? [] : res.map(el => {
        return {
            params: {
                id: el.id.toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const product = await ProductAPI.getProduct(params.id)
    
    return {
        props: {
            product: typeof product !== 'string' ? product : {} 
        },
    }
}

export default function Product(props) {
    
    return (
        <Main title='Home' description='Home description'>
            <div className="container my-4">
                <ProductItem product={props.product}></ProductItem>
            </div>
        </Main>
    )
}