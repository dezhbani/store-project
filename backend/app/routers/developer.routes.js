const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumber } = require("../utils/function");

/**
 * @swagger
 *  tags: 
 *      name: Developer-routes
 *      description: developer utils
 */

/**
 * @swagger
 *  /developer/hash-password/{password}:
 *      get:
 *          tags: [Developer-routes]
 *          summary: hash data with bcrypt 
 *          parameters: 
 *              -   in: path 
 *                  type: string
 *                  required: true
 *                  name: password
 *          responses: 
 *              200:
 *                  description: success
 */

router.get("/hash-password/:password", (req, res, next) =>{
    const { password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password, salt));
})
/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags: [Developer-routes]
 *          summary: get random number 
 *          responses: 
 *              200:
 *                  description: success
 */

router.get("/random-number", (req, res, next) =>{
    return res.send(randomNumber().toString());
})

module.exports = {
    DeveloperRoute: router
}