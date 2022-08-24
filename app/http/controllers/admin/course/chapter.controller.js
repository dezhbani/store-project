const { Controllers } = require("../../controllers");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { courseModel } = require("../../../models/course");
const createHttpError = require("http-errors");
const { CourseCountrollers } = require("./course.controller");
const { deleteInvalidProperties } = require("../../../../utils/function");

class ChapterController extends Controllers {
    async addChapter(req, res, next) {
        try {
            const { id, title, text } = req.body;
            await CourseCountrollers.findCourseById(id);
            const saveChapter = await courseModel.updateOne({ _id: id }, {
                $push: {
                    chapter: { title, text, episodes: [] }
                }
            })
            if (saveChapter.modifiedCount == 0) throw createHttpError.InternalServerError("فصل ایجاد نشد");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "فصل با موفقیت ایجاد شد "
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChaptersOfCourse(req, res, next) {
        try {
            const { courseID } = req.params;
            const chapters = await this.getChapterOfCourseByID(courseID);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    chapters
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateChapterByID(req, res, next) {
        try {
            const { chapterID } = req.params;
            await this.getChapterByID(chapterID);
            const data = req.body;
            deleteInvalidProperties(data, ["_id"]);
            const updateResult = await courseModel.updateOne(
                {"chapter._id": chapterID},
                {$set: {"chapter.$": data}}
            )
            if(updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("به روز رسانی فصل انجام نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async deleteChapterByID(req, res, next) {
        try {
            const { chapterID } = req.params;
            const chapters = await this.getChapterByID(chapterID);
            console.log(chapters)
            const deleteResult = await courseModel.updateOne({ "chapter._id": chapterID }, {
                $pull: { 
                    chapter: {
                        _id: chapterID
                    }
                }
            });
            console.log(deleteResult)
            if (deleteResult.modifiedCount == 0) throw createHttpError.InternalServerError("فصل حذف نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "فصل با موفقیت حذف شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getChapterOfCourseByID(id) {
        const chapters = await courseModel.findOne({ _id: id }, { chapter: 1, title: 1 });
        if (!chapters) throw createHttpError.NotFound("دوره ای یافت نشد");
        if (!chapters.chapter) throw createHttpError.NotFound("فصلی برای این دوره یافت نشد");
        return chapters
    }

    async getChapterByID(id) {
        const chapter = await courseModel.findOne({ "chapter._id": id }, { "chapter.$": 1 });
        if (!chapter) throw createHttpError.NotFound("فصلی با این شناسه یافت نشد");
        return chapter
    }
}

module.exports = {
    ChapterController: new ChapterController()
}