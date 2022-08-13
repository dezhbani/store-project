const { Controllers } = require("../../controllers");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { courseModel } = require("../../../models/course");

class ChapterController extends Controllers{
    async addChapter(req, res, next) {
        try {
            const { id, title, text } = req.body;
            await this.findCourseById(id);
            const saveChapter = await courseModel.updateOne({ _id: id }, {
                $push: {
                    chapter: { title, text, episodes: [] }
                }
            })
            if(saveChapter.modifiedCount == 0) throw createHttpError.InternalServerError("فصل ایجاد نشد");
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
}

module.exports ={
    ChapterController: new ChapterController()
}