/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first_name of user
 *                      example: Erfan
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                      example: Yousefi
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                      example: erfanyousefi@gmail.com
 *                  username:
 *                      type: string
 *                      example: erfanyousefi
 *                      description: the username of user
 *                      
 */

/**
 * @swagger
 *  /admin/user/list:
 *      get:
 *          tags: [User(AdminPanel)]
 *          summary: get all user
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in user first_name, last_name, username, mobile, email
 *          responses: 
 *              200: 
 *                  description: success
 */

/**
 * @swagger
 *  /admin/user/update-profile:
 *      patch:
 *          tags: [Users(AdminPanel)]
 *          summary: update user detail and profile
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */