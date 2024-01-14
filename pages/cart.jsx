import Main from "@/components/Main";
import ProductCart from "@/components/product/ProductCart";

export default function Cart() {
    return (
        <Main title="Cart" description="My Cart">
            <div className="container">
                <ProductCart></ProductCart>
            </div>
        </Main>
    )
}