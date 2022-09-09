module.exports = {
    mongoIDpaterns: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
    ROLES: Object.freeze({
        USER: "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        TEACHER: "TEACHER",
        SUPPLIER: "SUPPLIER"
    }),
    PERMISSIONS: Object.freeze({
        BLOG: "blog",
        CATEGORY: "category",
        COURSE: "course",
        CHAPTER: "chapter",
        EPISODE: "episodes",
        PRODUCT: "product",
        USER: "user",
        PAYMENT: "payment",
        ADMIN: "admin",
        ALL: "all",
        PERMISSION: "permission",
        ROLE: "role"
    }),
    ACCESS_TOKEN_SECRET_KEY: "9D3AA02C74986D68B6F91EC2B8BAB0B48487AAE0A001753AD8B80DEDD9DAFAD8",
    REFRESH_TOKEN_SECRET_KEY: "61A50E19CE25A154597716A291112E0A69E4F74D9B99C85FBB6BFFE479ED8971"
}