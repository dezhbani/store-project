const { checkRole, verifyToken } = require("../http/middlewares/verifyAccessToken");
const redisClient = require("../utils/init-redis");
const { AdminRoutes } = require("./admin/admin.routes");
const { userAuthRoutes } = require("./user/auth");
const  {HomeRoutes}  = require("./api");
const { DeveloperRoutes } = require("./developer.routes");

const router = require("express").Router();

(async() => {
    await redisClient.set("key", "value")
    const value = await redisClient.get("key")
    console.log(value)
})()

router.use("/developer", DeveloperRoutes);
router.use("/user", userAuthRoutes);
router.use("/admin", verifyToken, checkRole("ADMIN"), AdminRoutes);
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router
}