const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.post("/add", ChapterController.addChapter) // create new chapter
router.get("/list/:courseID", ChapterController.getChaptersOfCourse) // get list of chapters
router.delete("/remove/:chapterID", ChapterController.deleteChapterByID) // get list of chapters
router.patch("/edit/:chapterID", ChapterController.updateChapterByID) // get list of chapters

module.exports = {
    adminChapterRoutes: router
}