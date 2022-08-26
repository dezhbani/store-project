
/**
 * @swagger
 *  components:
 *      schemas:
 *          EpisodeType:
 *              type: string
 *              enum:
 *                  -   lock
 *                  -   unlock
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          Episode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseID:
 *                      type: string
 *                      description: the course id
 *                      example: 62eb7d1f1f6e139013c7d9c2
 *                  chapterID:
 *                      type: string
 *                      description: the chapter id of course
 *                      example: 62eb7d1f1f6e139013c7d9c2
 *                  title:
 *                      type: string
 *                      description: the title of epsode
 *                      example: title of episode 1
 *                  text:
 *                      type: string
 *                      description: the text of episode
 *                      example: text of episode 1
 *                  type:
 *                      type: string
 *                      description: the type of episode (select lock or unlock)
 *                      $ref: '#/components/schemas/EpisodeType'
 *                  video:
 *                      type: string
 *                      description: the the file of video
 *                      format: binary
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(AdminPanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Episode'
 *          responses:
 *              201:
 *                  description: created
 */ 

/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [Episode(AdminPanel)]
 *          summary: create and save course
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: ok
 */ 