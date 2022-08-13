const router = require("express").Router();
const { ProductController } = require("../../http/controllers/admin/product/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

router.post("/add", uploadFile.array("image", 10), stringToArray("tags"), ProductController.addProduct)
router.post("/edit/:id", uploadFile.array("image", 10), stringToArray("tags", "colors"), ProductController.editProduct)
router.get("/list", ProductController.getAllProduct)
router.get("/search", ProductController.searchProduct)
router.get("/:id", ProductController.getProductByID)
router.delete("/:id", ProductController.removeProduct)
// router.patch()

module.exports = {
    adminProductRoutes: router
}