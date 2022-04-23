const homeControllers = require("../../http/controllers/api/home.controllers");
const router = require("express").Router();

router.get("/", homeControllers.indexPage);

module.exports = {
    HomeRoutes: router
}