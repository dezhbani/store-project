const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.post("/add/chapter", ChapterController.addChapter) // create new chapter

module.exports = {
    adminChapterRoutes: router
}