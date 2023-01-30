const { MessageController } = require("../../http/controllers/support/message.controller");

const router = require("express").Router();
router.post("/add", MessageController.addMessage)
router.get("/list", MessageController.getMessages)

module.exports = {
    namespaceRoutes: router
}