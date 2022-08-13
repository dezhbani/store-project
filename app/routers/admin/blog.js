const router = require("express").Router();
const { adminBlogController } = require("../../http/controllers/admin/blog/blogs.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

router.get("/", adminBlogController.getListOfBlogs)
router.post("/add",uploadFile.single("image"), stringToArray("tags"), adminBlogController.createBlog)
router.patch("/update/:id",uploadFile.single("image"), stringToArray("tags"), adminBlogController.updateBlogByID)
router.get("/:id", adminBlogController.getBlogByID)
router.delete("/:id", adminBlogController.deletBlogByID)

module.exports = {
    adminBlogRoutes: router
}