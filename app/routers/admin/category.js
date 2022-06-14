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
 *  /admin/category/edit/{id}:
 *      patch:
 *          tags: [admin-panel]
 *          summary: edit category title with Object id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *          responses:
 *              200:
 *                  description: success
 */
router.patch("/edit/:id", CategoryController.editCategory)


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


/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [admin-panel]
 *          summary: get category by Object-id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", CategoryController.getCategoryById)

module.exports = {
    categoryRoutes: router
}