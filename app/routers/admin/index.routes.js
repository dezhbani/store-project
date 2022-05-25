const { categoryRoutes } = require("./category");
const router = require("express").Router();

router.use("/category", categoryRoutes);

module.exports = {
    AdmiRoutes: router
}