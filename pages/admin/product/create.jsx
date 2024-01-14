import Main from "@/components/Main";
import ProductForm from "@/components/product/ProductForm";

export default function CreateProduct() {
    return (
        <Main title='Create Product' description='Create Product'>
            <div className="container my-4">
                <ProductForm ></ProductForm>
            </div>
        </Main>
    )
}