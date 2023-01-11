/**
 * 
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  name:
 *                                      type: string
 *                                      example: "title of permission"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of permission"
 *                                          
 */
 
/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required: 
 *                  -   name
 *                  -   description
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of permissions
 *                  description:
 *                      description: the describe of permission
 *                      type: string
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the title of permissions
 *                  description:
 *                      type: string
 *                      description: the describe of permission
 */

/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: create new permissions
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Permission'
 *          responses:
 *              201:
 *                  description: created
 */

/**
 * @swagger
 *  /admin/permission/list:
 *      get:
 *          tags: [RBAC(AdminPanel)]
 *          summary: get all permissions
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfPermissions'
 */

/**
 * @swagger
 *  /admin/permission/edit/{id}:
 *      patch:
 *          tags: [RBAC(AdminPanel)]
 *          summary: edit permissions by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Permission'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/permission/delete/{id}:
 *      delete:
 *          tags: [RBAC(AdminPanel)]
 *          summary: delete permissions by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */