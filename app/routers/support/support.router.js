const { SupportController } = require("../../http/controllers/support/support.controller");
const { namespaceRoutes } = require("./namespace.router");
const { roomRoutes } = require("./room.router");

const router = require("express").Router();

router.use("/namespace", namespaceRoutes)
router.use("/room", roomRoutes)
router.get("/", SupportController.renderChatRoom)

module.exports={
    supportRoutes: router
}