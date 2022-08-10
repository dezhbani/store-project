

/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */ 

/**
 * @swagger
 *  /admin/blog:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/blog/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create blog 
 *          consumes:
 *              - multipart/form-data
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: created
 */

/**
 * @swagger
 *  /admin/blog/update/{id}:
 *      patch:
 *          tags: [Blog(AdminPanel)]
 *          summary: create blog 
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
 *          
 *          responses:
 *              201:
 *                  description: created
 */

/**
 * @swagger
 *  /admin/blog/{id}:
 *      get:
 *          summary: get blog by ID & populate this field
 *          tags: [Blog(AdminPanel)]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses:
 *              200: 
 *                  description: success
 */

/**
 * @swagger
 *  /admin/blog/{id}:
 *      delete:
 *          summary: get blog by ID & populate this field
 *          tags: [Blog(AdminPanel)]
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          responses:
 *              200: 
 *                  description: success
 */