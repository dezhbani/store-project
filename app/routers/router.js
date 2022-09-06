const { checkRole, verifyToken } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { userAuthRoutes } = require("./user/auth");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");

const router = require("express").Router();

router.use("/developer", DeveloperRoutes);
router.use("/user", userAuthRoutes);
router.use("/admin", verifyToken, checkRole("ADMIN"), AdminRoutes);
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router
}