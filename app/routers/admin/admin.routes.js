const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constant");
const { adminBlogRoutes } = require("./blog");
const { adminCategoryRoutes } = require("./category");
const { adminChapterRoutes } = require("./chapter");
const { adminCourseRoutes } = require("./course");
const { adminEpisodeRoutes } = require("./episode");
const { adminPermissionRoutes } = require("./permission");
const { adminProductRoutes } = require("./product");
const { adminRoleRoutes } = require("./role");
const { adminUserRoutes } = require("./user");
const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: AdminPanel
 *          description: action of admin (add, remove, edit & any do)
 *      -   name: RBAC(AdminPanel)
 *          description: RoleBaseAccessControll system create and manage role & permission
 *      -   name: User(AdminPanel)
 *          description: management of all user 
 *      -   name: Course(AdminPanel)
 *          description: all methods and routes aboute category
 *      -   name: Chapter(AdminPanel)
 *          description: management of chapter section
 *      -   name: Episode(AdminPanel)
 *          description: the videos(episodes) of the chapter
 *      -   name: Product(AdminPanel)
 *          description: managment product routes
 *      -   name: Blog(AdminPanel)
 *          description: made blog managment admin panel
 *      -   name: Category(AdminPanel)
 *          description: all methods and routes aboute category
 */

router.use("/user", checkPermission([PERMISSIONS.USER]), adminUserRoutes); 
router.use("/category", checkPermission([PERMISSIONS.CATEGORY]), adminCategoryRoutes); 
router.use("/blog", checkPermission([PERMISSIONS.BLOG]), adminBlogRoutes);
router.use("/product", checkPermission([PERMISSIONS.PRODUCT]), adminProductRoutes); 
router.use("/course", checkPermission([PERMISSIONS.COURSE]), adminCourseRoutes);
router.use("/chapter", checkPermission([PERMISSIONS.CHAPTER]), adminChapterRoutes);
router.use("/episode", checkPermission([PERMISSIONS.EPISODE]), adminEpisodeRoutes);
router.use("/permission", checkPermission([PERMISSIONS.ALL]), adminPermissionRoutes);
router.use("/role", checkPermission([PERMISSIONS.ALL]), adminRoleRoutes);

module.exports = {
    AdminRoutes: router
}