
/** 
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [user-authorization]
 *          summary: check otp value in user controller
 *          description: enter sms code resived
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Check-OTP"
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

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token for get new token and refresh token
 *          description : fresh token
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description : success
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: them user mobile for signup/signin
 *          Check-OTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: them user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced mobile from getOTP
 *          RefreshToken:
 *              type: object
 *              required: 
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refresh token for get new token & refresh token
 */

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
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
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
