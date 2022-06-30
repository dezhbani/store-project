const { verifyToken } = require("../../http/middlewares/verifyAccessToken");
const { adminBlogRoutes } = require("./blog");
const { categoryRoutes } = require("./category");
const router = require("express").Router();

router.use("/category", categoryRoutes);
router.use("/blog", verifyToken, adminBlogRoutes);

module.exports = {
    AdminRoutes: router
}