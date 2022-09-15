const { Controllers } = require("../../controllers");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { courseModel } = require("../../../models/course");
const { bindImagePath, deleteFileInPublic, copyObject, deleteInvalidProperties, getTime, timeOfCourse } = require("../../../../utils/function");
const { createCourseSchema } = require("../../../validations/admin/course.schema");
const { userModel } = require("../../../models/user");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const path = require("path");

class CourseController extends Controllers {
    async addCourse(req, res, next) {
        try {
            await createCourseSchema.validateAsync(req.body);
            const { fileUploadPath, filename, text, short_text, category, title, type, tags, price, discount } = req.body;
            const image = bindImagePath(fileUploadPath, filename)
            const teacher = req.user._id;
            if (Number(price) > 0 && type === "free") throw createHttpError.BadRequest("برای دوره رایگان نمی توان قیمت ثبت کرد");
            const course = await courseModel.create({
                title,
                text,
                short_text,
                tags,
                category,
                price,
                discount,
                teacher,
                image,
                status: "no started"
            })
            return res.status(httpStatus.OK).json({
                data: {
                    statusCode: httpStatus.OK,
                    message: "دوره با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            console.log(error)
            next(error)
        }
    }
    async getAllCorse(req, res, next) {
        try {
            const courses = await courseModel.find({}).sort({ _id: -1 });
            return res.status(httpStatus.OK).json({
                data: {
                    statusCode: httpStatus.OK,
                    courses
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async searchCourse(req, res, next) {

        try {
            const { search } = req.query;
            let courses;
            if (search) {
                courses = await courseModel.find({
                    $text: { $search: new RegExp(search, "ig") }
                })
                    .populate([
                        { path: "category", select: { title: 1 } },
                        { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
                    ])
                    .sort({ _id: -1 })
            } else {
                courses = await courseModel.find({})
                    .populate([
                        { path: "category", select: { title: 1 } },
                        { path: "teacher", select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
                    ])
                    .sort({ _id: -1 })
            }
            return res.status(httpStatus.OK).json({
                data: {
                    statusCode: httpStatus.OK,
                    courses
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async getCourseByID(req, res, next) {

        try {
            const { id } = req.params;
            const course = await courseModel.findById(id);
            if (!course) throw createHttpError.NotFound("دوره ای یافت نشد");
            return res.status(httpStatus.OK).json({
                data: {
                    statusCode: httpStatus.OK,
                    course
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async updateCourseById(req, res, next) {
        try {
            const { courseID } = req.params;
            const course = await this.findCourseById(courseID);
            const data = copyObject(req.body);
            const { filename, fileUploadPath } = req.body;
            let blackList = ["time", "chapter", "episodes", "students", "bookmarks", "like", "dislikes", "comments", "teacher", "filename", "fileUploadPath"];
            deleteInvalidProperties(data, blackList);
            if(req.file) {
                data.image = path.join(fileUploadPath, filename);
                deleteFileInPublic(course.image)
            }
            const updateCourseResult = await courseModel.updateOne({_id: courseID}, {
                $set: data
            });
            if(updateCourseResult.modifiedCount == 0) createHttpError.InternalServerError("دوره به روزرسانی نشد")     
            return res.status(httpStatus.OK).json({
                statuscode: httpStatus.OK,
                data: {
                    message: "دوره با موفقیت به روزرسانی شد"
                }
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async findCourseById(id) {
        console.log(id)
        if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه وارد شده صحیح نمی باشد");
        const course = await courseModel.findById(id);
        if (!course) throw createHttpError.NotFound("دوره ای یافت نشد")
        return course
    }
}

module.exports = {
    CourseCountrollers: new CourseController()
}