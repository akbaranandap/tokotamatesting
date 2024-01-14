import { File } from "../file/file-model";
import { User } from "../user/user-model";

class Product {
    /**
     * @param {number} id
     * @param {string} name
     * @param {ProductImage[]} image
     * @param {string} description
     * @param {string} price
     * @param {ProductCategory} category
     * @param {Review[]} reviews
     */
    constructor(id, name, image, description, price, category, reviews) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.category = category;
        this.reviews = reviews;
    }
}

class ProductReq {
    /**
     * @param {string} name
     * @param {string} description
     * @param {string} price
     * @param {number} categoryId
     */
    constructor(name, description, price, categoryId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
    }
}


class ProductImage {
    /**
     * @param {number} id
     * @param {File} File
     * @param {boolean} featured
     * @param {Product | undefined} product
     */
    constructor(id, File, featured, product) {
        this.id = id;
        this.File = File;
        this.featured = featured;
        this.product = product;
    }
}

class ProductImageReq {
    /**
     * @param {boolean} featured
     * @param {number} fileId
     * @param {number | undefined} productId
     */
    constructor(featured, fileId, productId) {
        this.featured = featured;
        this.fileId = fileId;
        this.productId = productId;
    }
}

class CartReq {
    /**
     * @param {number} userId
     * @param {number | undefined} productId
     */
    constructor(userId, productId) {
        this.userId = userId;
        this.productId = productId;
    }   
}

class Cart {
    /**
     * @param {number} id
     * @param {User} user
     * @param {Product[]} products
     */
    constructor(id, user, products) {
        this.id = id
        this.user = user
        this.products = products;
    }   
}

export { 
    ProductReq,
    Product,
    ProductImage,
    ProductImageReq,
    Cart,
    CartReq
}