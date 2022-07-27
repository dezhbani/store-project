const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { mongoIDpaterns } = require("../../../utils/constant");

const createProductSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان بلاگ صحیح نمی باشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد")),
    category: Joi.string().pattern(mongoIDpaterns).error(createHttpError.NotFound("دسته بندی مورد نظر یافت نشد")),
    price: Joi.number().error(createHttpError.NotFound("قیمت مورد نظر یافت نشد")),
    discount: Joi.number().error(createHttpError.NotFound("تخفیف مورد نظر یافت نشد")),
    count: Joi.number().error(createHttpError.NotFound("تعداد مورد نظر یافت نشد")),
    weight: Joi.allow(null, 0, "0").error(createHttpError.NotFound("وزن مورد نظر یافت نشد")),
    length: Joi.allow(null, 0, "0").error(createHttpError.NotFound("طول مورد نظر یافت نشد")),
    height: Joi.allow(null, 0, "0").error(createHttpError.NotFound("ارتفاع مورد نظر یافت نشد")),
    width: Joi.allow(null, 0, "0").error(createHttpError.NotFound("عرض مورد نظر یافت نشد")),
    type: Joi.string().regex(/virtual|phisical\b/i).error(createHttpError.NotFound("تایپ مورد نظر صحیح نیست")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp)$/).error(createHttpError.BadRequest("فرمت ارسال شده صحیح نمیباشد")),
    fileUploadPath: Joi.allow()
})

module.exports = {
    createProductSchema
}