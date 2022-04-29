const { userAuthControllers } = require("../../http/controllers/user/auth/auth.controllers");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *      name: user-authorization
 *      description: user auth section
 */

/** 
* @swagger
*  /user/login:
*      post:
*          tags: [user-authorization]
*          summary: login user in userpanel with phone number
*          description: one time password(OTP) login
*          parameters:
*          -   name: mobile
*              description: fa-IR phone number
*              in: formData
*              required: true
*              type: string
*          responses:
*              201: 
*                  description: Success
*              400: 
*                  description: Bad Request
*              401: 
*                  description: Unauthorization
*              500: 
*                  description: Internal Server Error 
*/

router.post("/login", userAuthControllers.getOTP)

module.exports = {
    userAuthRoutes: router
}