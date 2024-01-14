import Main from "@/components/Main";
import ProductForm from "@/components/product/ProductForm";
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

export default function EditProduct(props) {
    return (
        <Main title='Edit Product' description='Edit Product'>
            <div className="container my-4">
                <ProductForm product={props.product} callback={ProductAPI.editProduct} ></ProductForm>
            </div>
        </Main>
    )
}