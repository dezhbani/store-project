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
*  /user/get-otp:
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

router.post("/get-otp", userAuthControllers.getOTP);
/** 
* @swagger
*  /user/check-otp:
*      post:
*          tags: [user-authorization]
*          summary: check otp value in user controller
*          description: enter sms code resived
*          parameters:
*          -   name: mobile
*              description: fa-IR phone number
*              in: formData
*              required: true
*              type: string
*          -   name: code
*              description: enter sms code
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
router.post("/check-otp", userAuthControllers.checkOTP);
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token ffor get new token and refresh token
 *          description : fresh token
 *          parameters:
 *              -   required: true
 *                  in: formData
 *                  name: refreshToken
 *                  type: string
 *          responses:
 *              200:
 *                  description : success
 */
router.post("/refresh-token", userAuthControllers.refreshToken);

module.exports = {
    userAuthRoutes: router
}