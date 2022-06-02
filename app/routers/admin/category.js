const router = require("express").Router();
const categoryController = require("../../http/controllers/admin/category.controller");
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
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [admin-panel]
 *          summary: get all parents of category or category heads
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents", CategoryController.geAllParents)
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [admin-panel]
 *          summary: get all parents of category or category heads
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: parent
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/children/:parent", CategoryController.geChildrenOfParents)
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [admin-panel]
 *          summary: get All Categories 
 *          responses:
 *              200:
 *                  description: success
 */

router.get("/all", CategoryController.getAllCategory)
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [admin-panel]
 *          summary: delete category with Object-id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          responses:
 *              200:
 *                  description: success
 */

router.delete("/remove/:id", CategoryController.removeCategory)

module.exports = {
    categoryRoutes: router
}