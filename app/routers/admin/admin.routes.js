const { verifyToken } = require("../../http/middlewares/verifyAccessToken");
const { adminBlogRoutes } = require("./blog");
const { adminCategoryRoutes } = require("./category");
const { adminProductRoutes } = require("./product");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: AdminPanel
 *          description: action of admin (add, remove, edit & any do)
 *      -   name: Product(AdminPanel)
 *          description: managment product routes
 *      -   name: Blog(AdminPanel)
 *          description: made blog managment admin panel
 *      -   name: Category(AdminPanel)
 *          description: all methods and routes aboute category
 */

router.use("/category", adminCategoryRoutes);
router.use("/blog", adminBlogRoutes);
router.use("/product", adminProductRoutes);

module.exports = {
    AdminRoutes: router
}