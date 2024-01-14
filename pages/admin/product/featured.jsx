import Main from "@/components/Main";
import ProductFeaturedImage from '@/components/product/ProductFeaturedImage'
import ProductAPI from '@/api/product'

export async function getStaticProps() {
    const featuredProductImages = await ProductAPI.getFeaturedProductImage()

    return {
        props: {
            featuredProductImages: typeof featuredProductImages !== 'string' ? featuredProductImages : {}
        },
    }
}

export default function CreateFeaturedProduct(props) {
    return (
        <Main title='Create Product' description='Create Product'>
            <div className="container my-4">
                <ProductFeaturedImage images={props.featuredProductImages} ></ProductFeaturedImage>
            </div>
        </Main>
    )
}