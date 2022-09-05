const { RoleController } = require("../../http/controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");

const router = require("express").Router();

router.post("/add", stringToArray("permission"), RoleController.addRole)
router.get("/list", RoleController.getAllRole)
router.patch("/edit/:id", RoleController.editRole)
router.delete("/delete/:field", RoleController.deleteRole)

module.exports = {
    adminRoleRoutes: router
}