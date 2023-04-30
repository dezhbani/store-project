const { verifyToken } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { userAuthRoutes } = require("./user/auth");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { graphqlHTTP } = require("express-graphql");
const { graphqlConfig } = require("../graphql/configs/graphql.config");
const router = require("express").Router(); 

router.use("/developer", DeveloperRoutes);
router.use("/user", userAuthRoutes);
router.use("/admin", verifyToken, AdminRoutes);
router.use("/graphql", graphqlHTTP(graphqlConfig))
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes: router
}