class ProductCategory {
    /**
     * @param {number} id
     * @param {string} name
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
        /** @type {Product[]} */
        this.Product = [];
    }
}

class Category {
    /**
     * @param {number} id
     * @param {string} name
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    
}

class ProductCategoryReq {
    /**
     * @param {string} name
     */
    constructor(name) {
        this.name = name;
    }
}

export { 
    ProductCategoryReq,
    ProductCategory,
    Category
}