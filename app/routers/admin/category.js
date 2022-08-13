const router = require("express").Router();
const { CategoryController } = require("../../http/controllers/admin/category/category.controller");

router.post("/add", CategoryController.addCategory)
router.get("/parents", CategoryController.geAllParents)
router.get("/children/:parent", CategoryController.geChildrenOfParents)
router.get("/all", CategoryController.getAllCategory)
router.patch("/edit/:id", CategoryController.editCategory)
router.delete("/remove/:id", CategoryController.removeCategory)
router.get("/:id", CategoryController.getCategoryById)

module.exports = {
    adminCategoryRoutes: router
}