const router = require("express").Router();
const { CategoryController } = require("../../http/controllers/admin/category.controller");
/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [admin-panel]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parents
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", CategoryController.addCategory)

module.exports = {
    categoryRoutes: router
}