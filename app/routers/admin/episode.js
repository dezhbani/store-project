const { EpisodeController } = require("../../http/controllers/admin/course/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = require("express").Router();

router.post("/add", uploadVideo.single("video"), EpisodeController.addEpisode)

module.exports = {
    adminEpisodeRoutes: router
}