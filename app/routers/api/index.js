const homeControllers = require("../../http/controllers/api/home.controllers");
const { verifyToken } = require("../../http/middlewares/verifyAccessToken");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description : index page route and data
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes 
 *      tags: [IndexPage]
 *      description : get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *              schema: 
 *                  type: string
 *                  example : Index Page Store
 *          404: 
 *              description: not Found
 */

router.get("/", verifyToken, homeControllers.indexPage);

module.exports = {
    HomeRoutes: router
}