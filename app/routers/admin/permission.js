const { PermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");

const router = require("express").Router();

router.post("/add", PermissionController.addPermission)
router.get("/list", PermissionController.getAllPermission)
router.patch("/edit/:id", PermissionController.editPermission)
router.delete("/delete/:id", PermissionController.deletePermission)

module.exports = {
    adminPermissionRoutes: router
}