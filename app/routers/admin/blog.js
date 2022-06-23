const router = require("express").Router();
const { adminBlogController } = require("../../http/controllers/admin/blogs.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

/**
 * @swagger
 *  /admin/blog:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/", adminBlogController.getListOfBlogs)

/**
 * @swagger
 *  /admin/blog/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create blog 
 *          consumes:
 *              - multipart/form-data
 *              - application/x-ww-form-data-urlencoded
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3 || str || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses:
 *              201:
 *                  description: created
 */
router.post("/add",uploadFile.single("image"), stringToArray("tags"), adminBlogController.createBlog)
module.exports = {
    adminBlogRoutes: router
}