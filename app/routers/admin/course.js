const { CourseCountrollers } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseCountrollers.addCourse) // create new course
router.get("/list", CourseCountrollers.getAllCorse) //get all course
router.get("/search", CourseCountrollers.searchCourse) //get serach about  course
router.get("/:id", CourseCountrollers.getCourseByID) // get a course                                                                                                                                                                                                                                                                                            
router.patch("/edit/:courseID", uploadFile.single("image"), CourseCountrollers.updateCourseById) // get a course                                                                                                                                                                                                                                                                                            
module.exports = {
    adminCourseRoutes: router
}