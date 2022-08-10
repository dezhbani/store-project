
/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the parent of category
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create new category title
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get all parents of category or category heads
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get all parents of category or category heads
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: parent
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All Categories 
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/edit/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: edit category title with Object id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summary: delete category with Object-id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get category by Object-id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          responses:
 *              200:
 *                  description: success
 */
