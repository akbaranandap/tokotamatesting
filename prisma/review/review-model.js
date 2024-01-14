class Review {
    /**
     * @param {number} id
     * @param {string} name
     * @param {string} review
     * @param {Product | null} product
     */
    constructor(id, name, review, product) {
        this.id = id;
        this.name = name;
        this.review = review;
        this.Product = product;
    }
}

class ReviewReq {
    /**
     * @param {number | null} id
     * @param {string} name
     * @param {string} review
     * @param {string} productId
     */
    constructor(id, name, review, productId) {
        this.id = id;
        this.name = name;
        this.review = review;
        this.productId = productId;
    }
}

export {
    Review,
    ReviewReq
}