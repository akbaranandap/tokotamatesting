class CreateReq {
    constructor() {
        this.username = ''
        this.email = ''
        this.password = ''
    }
}

class User {
    constructor() {
        this.id = -1
        this.username = ''
        this.email = ''
        this.password = ''
        this.createdAt = new Date()
    }
}

export { CreateReq, User }