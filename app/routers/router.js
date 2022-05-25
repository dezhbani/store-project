const redisClient = require("../utils/init-redis");
const { AdmiRoutes } = require("./admin/index.routes");
const  {HomeRoutes}  = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { userAuthRoutes } = require("./user/auth");

const router = require("express").Router();

(async() => {
    await redisClient.set("key", "value")
    const value = await redisClient.get("key")
    console.log(value)
})()

router.use("/developer", DeveloperRoutes);
router.use("/user", userAuthRoutes);
router.use("/admin", AdmiRoutes);
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router
}