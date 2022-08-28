
/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special  
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *                  -   teacher
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: title for course 1
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of course
 *                      example: short text for course 1
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                      example: text for course 1
 *                  tags:
 *                      type: array
 *                      description: the list of tags for example(#tag1 #tag2 #tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in course
 *                      example: 6298eaecc64b24d6ef3f2a8e
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: 15000
 *                  discount:
 *                      type: string
 *                      description: the discount for course
 *                      example: 10
 *                  teacher:
 *                      type: string
 *                      description: the teacher of course
 *                      example: 627fdc85feda1ceaff9d1639
 *                  type:
 *                      type: array
 *                      $ref: '#/components/schemas/Types'
 *                  image:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: the index picture of course
 *          editCourse:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: title for course 1
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of course
 *                      example: short text for course 1
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                      example: text for course 1
 *                  tags:
 *                      type: array
 *                      description: the list of tags for example(#tag1 #tag2 #tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in course
 *                      example: 6298eaecc64b24d6ef3f2a8e
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: 15000
 *                  discount:
 *                      type: string
 *                      description: the discount for course
 *                      example: 10
 *                  teacher:
 *                      type: string
 *                      description: the teacher of course
 *                      example: 627fdc85feda1ceaff9d1639
 *                  type:
 *                      type: array
 *                      $ref: '#/components/schemas/Types'
 *                  image:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: the index picture of course
 */

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text and describe of course"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | Completed | Holding"
 *                                  time:
 *                                      type: string
 *                                      example: "01:22:34"
 *                                  price:
 *                                      type: integer
 *                                      example: 250,000
 *                                  discount:
 *                                      type: interger
 *                                      example: 20
 *                                  studendtCount:
 *                                      type: integer
 *                                      example: 340
 *                                  teacher:
 *                                      type: string
 *                                      example: "erfan yousefi"
 */

/**
 * @swagger
 *  /admin/course/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201:
 *                  description: created
 */ 

/**
 * @swagger
 *  /admin/course/edit/{courseID}:
 *      patch:
 *          tags: [Course(AdminPanel)]
 *          summary: create and save course
 *          parameters: 
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/editCourse'
 *          responses:
 *              200:
 *                  description: success
 */ 

/**
 * @swagger
 *  /admin/course/list:
 *      get:
 *          tags:  [Course(AdminPanel)]
 *          summary: get list of courses 
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
 * @swagger
 *  /admin/course/search:
 *      get:
 *          tags:  [Course(AdminPanel)]
 *          summary: search in course (text, short_text, title)
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in course 
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/course/{id}:
 *      get:
 *          tags:  [Course(AdminPanel)]
 *          summary: get course by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: get course by id 
 *          responses: 
 *              200:
 *                  description: success
 */