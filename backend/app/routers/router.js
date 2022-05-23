const redisClient = require("../utils/init-redis");
const  {HomeRoutes}  = require("./api");
const { DeveloperRoute } = require("./developer.routes");
const { userAuthRoutes } = require("./user/auth");

const router = require("express").Router();

(async() => {
    await redisClient.set("key", "value")
    const value = await redisClient.get("key")
    console.log(value)
})()

router.use("/user", userAuthRoutes);
router.use("/developer", DeveloperRoute)
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router
}