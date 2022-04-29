const  {HomeRoutes}  = require("./api");
const { userAuthRoutes } = require("./user/auth");

const router = require("express").Router();

router.use("/user", userAuthRoutes);
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router
}