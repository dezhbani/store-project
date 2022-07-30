const router = require("express").Router();
const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

/**
 * @swagger
 *  components:
 *      schemas:
 *          Type:
 *              type: string
 *              example: virtual - phisical

 */ 

//  *                  virtual:
//  *                      description: specify type of product
//  *                      required: true
//  *                      $ref: '#/components/schemas/Virtual'  بعدا روش کار کن  radio button 

// *          Virtual:
// *              type: boolean
// *          example: true
// *                  -   virtual

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: title for product 1
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of product
 *                      example: short text for product 1
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                      example: text for product 1
 *                  tags:
 *                      type: array
 *                      description: the list of tags for example(#tag1 #tag2 #tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in product
 *                      example: 6298eaecc64b24d6ef3f2a8e
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                      example: 15000
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                      example: 10
 *                  discount:
 *                      type: string
 *                      description: the discount for product
 *                      example: 10
 *                  type:
 *                      description: specify type of product
 *                      required: true
 *                      $ref: '#/components/schemas/Type'
 *                      example: virtual - phisical
 *                  image:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: the index picture of product
 *                  height:
 *                      type: string
 *                      description: the index height of product box
 *                  weight:
 *                      type: string
 *                      description: the index weight of product box
 *                  width:
 *                      type: string
 *                      description: the index width of product box
 *                  length:
 *                      type: string
 *                      description: the index length of product box
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: title for product 1
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of product
 *                      example: short text for product 1
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                      example: text for product 1
 *                  tags:
 *                      type: array
 *                      description: the list of tags for example(#tag1 #tag2 #tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in product
 *                      example: 6298eaecc64b24d6ef3f2a8e
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                      example: 15000
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                      example: 10
 *                  discount:
 *                      type: string
 *                      description: the discount for product
 *                      example: 10
 *                  type:
 *                      description: specify type of product
 *                      required: true
 *                      $ref: '#/components/schemas/Type'
 *                      example: virtual - phisical
 *                  image:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: the index picture of product
 *                  height:
 *                      type: string
 *                      description: the index height of product box
 *                  weight:
 *                      type: string
 *                      description: the index weight of product box
 *                  width:
 *                      type: string
 *                      description: the index width of product box
 *                  length:
 *                      type: string
 *                      description: the index length of product box
 *                  colors:
 *                      type: array
 *                      $ref: '#/components/schemas/Color'
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: title for product 1
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of product
 *                      example: short text for product 1
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                      example: text for product 1
 *                  tags:
 *                      type: array
 *                      description: the list of tags for example(#tag1 #tag2 #tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in product
 *                      example: 6298eaecc64b24d6ef3f2a8e
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                      example: 15000
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                      example: 10
 *                  discount:
 *                      type: string
 *                      description: the discount for product
 *                      example: 10
 *                  type:
 *                      description: specify type of product
 *                      required: true
 *                      $ref: '#/components/schemas/Type'
 *                      example: virtual - phisical
 *                  image:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: the index picture of product
 *                  height:
 *                      type: string
 *                      description: the index height of product box
 *                  weight:
 *                      type: string
 *                      description: the index weight of product box
 *                  width:
 *                      type: string
 *                      description: the index width of product box
 *                  length:
 *                      type: string
 *                      description: the index length of product box
 */ 

/**
 * @swagger
 *  /admin/product/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created
 */

router.post("/add", uploadFile.array("image", 10), stringToArray("tags"), ProductController.addProduct)

/**
 * @swagger
 *  /admin/product/edit/{id}:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: edit product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  example: 62dff8c5a31ecf5f5804d98f
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          responses:
 *              201:
 *                  description: created
 */

router.post("/edit/:id", uploadFile.array("image", 10), stringToArray("tags", "colors"), ProductController.editProduct)

/**
 * @swagger
 *  /admin/product/list:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: search in products
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list", ProductController.getAllProduct)

/**
 * @swagger
 *  /admin/product/search:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get list of product
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title, text, short_text of (product)
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/search", ProductController.searchProduct)

/**
 * @swagger
 *  /admin/product/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get list of product
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", ProductController.getProductByID)

/**
 * @swagger
 *  /admin/product/{id}:
 *      delete:
 *          tags: [Product(AdminPanel)]
 *          summary: get list of product
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          responses:
 *              200:
 *                  description: deleted
 */
router.delete("/:id", ProductController.removeProduct)
// router.patch()

module.exports = {
    adminProductRoutes: router
}