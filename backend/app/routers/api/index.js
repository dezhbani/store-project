const homeControllers = require("../../http/controllers/api/home.controllers");
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
 *      responses:
 *          200:
 *              description: success
 *              schema: 
 *                  type: string
 *                  example : Index Page Store
 *          404: 
 *              description: not Found
 */

router.get("/", homeControllers.indexPage);

module.exports = {
    HomeRoutes: router
}