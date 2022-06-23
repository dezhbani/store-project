const { adminBlogRoutes } = require("./blog");
const { categoryRoutes } = require("./category");
const router = require("express").Router();

router.use("/category", categoryRoutes);
router.use("/blog", adminBlogRoutes);

module.exports = {
    AdminRoutes: router
}