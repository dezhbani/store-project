const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { mongoIDpaterns } = require("../../../utils/constant");

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دوره صحیح نمی باشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد")),
    category: Joi.string().pattern(mongoIDpaterns).error(createHttpError.NotFound("دسته بندی مورد نظر یافت نشد")),
    teacher: Joi.string().pattern(mongoIDpaterns).error(createHttpError.NotFound("معلم وارد شده برای دوره یافت نشد")),
    price: Joi.number().error(createHttpError.NotFound("قیمت مورد نظر یافت نشد")),
    discount: Joi.number().error(createHttpError.NotFound("تخفیف مورد نظر یافت نشد")),
    type: Joi.string().regex(/(free|cash|special)/i).error(createHttpError.NotFound("تایپ مورد نظر صحیح نیست")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp)$/).error(createHttpError.BadRequest("فرمت ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})
const createEpisodeSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دوره صحیح نمی باشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    type: Joi.string().regex(/(lock|unlock)/i).error(createHttpError.NotFound("تایپ مورد نظر صحیح نیست")),
    courseID: Joi.string().pattern(mongoIDpaterns).error(createHttpError.NotFound("شناسه دوره صحیح نمیباشد")),
    chapterID: Joi.string().pattern(mongoIDpaterns).error(createHttpError.NotFound("شناسه فصل صحیح نمیباشد")),
    type: Joi.string().regex(/(lock|unlock)/i).error(createHttpError.NotFound("تایپ مورد نظر صحیح نیست")),
    filename: Joi.string().pattern(/(\.mp4|\.mkv|\.avi|\.mov|\.mpg)$/).error(createHttpError.BadRequest("فرمت ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}