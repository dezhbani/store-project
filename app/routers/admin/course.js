const { CourseCountrollers } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.post("/add", uploadFile.array("image", 10), stringToArray("tags"), CourseCountrollers.addCourse) // create new course
router.get("/list", CourseCountrollers.getAllCorse) //get all course
router.get("/search", CourseCountrollers.searchCourse) //get serach about  course
router.get("/:id", CourseCountrollers.getCourseByID) // get a course
// router.post("/add/episode") // create new episode
// router.delete("/course") // delete a course
// router.delete("/episode") // delete a episodes
// router.delete("/chapter") // delete a chapter
// router.patch("/edit/course") // edit a course
module.exports = {
    adminCourseRoutes: router
}