const { UserController } = require("../../http/controllers/admin/user/user.controller");

const router = require("express").Router();

router.get("/list", UserController.searchInUsers)
router.get("/update-profile", UserController.updateUserProfile)

module.exports = {
    adminUserRoutes: router
}