const { createEpisodeSchema } = require("../../../validations/admin/course.schema");
const { Controllers } = require("../../controllers");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { getTime } = require("../../../../utils/function");
const { courseModel } = require("../../../models/course");
const createHttpError = require("http-errors");
const {StatusCodes: httpStatus} = require("http-status-codes");
const { IDvalidator } = require("../../../validations/public.schema");

class EpisodeController extends Controllers {
    async addEpisode(req, res, next) {
        try {
            const { title, text, type, courseID, chapterID, filename, fileUploadPath } = await createEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const second = await getVideoDurationInSeconds(videoURL);
            const time = getTime(second);
            const episode = {
                title,
                text,
                type,
                time,
                videoAddress
            }
            const createEpisodeResult = await courseModel.updateOne({ _id: courseID, "chapter._id": chapterID }, {
                $push: { "chapter.$.episodes": episode }
            });
            if(createEpisodeResult.modifiedCount == 0) throw createHttpError.InternalServerError("افزودن ویدئو انجام نشد");
            return res.status(httpStatus.CREATED).json({
                StatusCode: httpStatus.CREATED,
                data: {
                    message: "ویدئو با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteEpisode(req, res, next) {
        try {
            const { id:episodeID } = await IDvalidator.validateAsync({id: req.params.episodeID});
            const deleteResult = await courseModel.updateOne({"chapter.episodes._id": episodeID }, {
                $pull: { "chapter.$.episodes":{
                    _id: episodeID
                } 
            }
            });
            if (deleteResult.modifiedCount == 0) throw createHttpError.InternalServerError("ویدئو حذف نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "ویدئو با موفقیت حذف شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = {
    EpisodeController: new EpisodeController()
}