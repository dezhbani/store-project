const { SupportController } = require("../../http/controllers/support/support.controller");

const router = require("express").Router();

router.get("/", SupportController.renderChatRoom)

module.exports={
    supportRoutes: router
}