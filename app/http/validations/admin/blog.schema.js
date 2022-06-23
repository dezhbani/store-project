const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { mongoIDpaterns } = require("../../../utils/constant");

const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان بلاگ صحیح نمی باشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp)$/).error(createHttpError.BadRequest("فرمت ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد")),
    category: Joi.string().pattern(mongoIDpaterns).error(createHttpError.NotFound("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath: Joi.allow()
})

module.exports = {
    createBlogSchema
}