/**
 * @swagger
 *  components:
 *      schemas:
 *          addChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id: 
 *                      type: string
 *                      description: id of course
 *                  title: 
 *                      type: string
 *                      description: title of chapter
 *                  text: 
 *                      type: string
 *                      description: summary of chapter
 *          editChapter:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: title of chapter
 *                  text: 
 *                      type: string
 *                      description: summary of chapter
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      post:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/addChapter'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/addChapter'
 *          responses:
 *              201: 
 *                  description: created
 */

/**
 * @swagger
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create and save course
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200: 
 *                  description: success
 */

/**
 * @swagger
 *  /admin/chapter/remove/{chapterID}:
 *      delete:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create and save course
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200: 
 *                  description: success
 */

/**
 * @swagger
 *  /admin/chapter/edit/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create and save course
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/editChapter'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/editChapter'
 *          responses:
 *              200: 
 *                  description: success
 */
