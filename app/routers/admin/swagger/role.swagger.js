
/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of role"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of role"
 *                                  permission:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "62822e4ff68cdded54aa928d"
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of permission"
 *                                              description:
 *                                                  type: string
 *                                                  example: "describe the permission"
 *                                          
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required: 
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the desc of role
 *                  permission:
 *                      description: the permissionID for role
 *                      type: array
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the desc of role
 *                  permission:
 *                      description: the permissionID for role
 *                      type: array
 */

/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: create new role
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *          responses:
 *              201:
 *                  description: created
 */

/**
 * @swagger
 *  /admin/role/list:
 *      get:
 *          tags: [RBAC(AdminPanel)]
 *          summary: get all role
 *          responses:
 *              200:
 *                  description: success
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 */

/**
 * @swagger
 *  /admin/role/edit/{id}:
 *      patch:
 *          tags: [RBAC(AdminPanel)]
 *          summary: edit role by id
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
 *                          $ref: '#/components/schemas/Edit-Role'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/role/delete/{field}:
 *      delete:
 *          tags: [RBAC(AdminPanel)]
 *          summary: edit role by id
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */