const  {HomeRoutes}  = require("./api");

const router = require("express").Router();

router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router
}