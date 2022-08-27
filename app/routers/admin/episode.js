const { EpisodeController } = require("../../http/controllers/admin/course/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = require("express").Router();

router.post("/add", uploadVideo.single("video"), EpisodeController.addEpisode)
router.delete("/remove/:episodeID", EpisodeController.deleteEpisode)
router.patch("/edit/:episodeID", uploadVideo.single("video"), EpisodeController.updateEpisode)

module.exports = {
    adminEpisodeRoutes: router
}