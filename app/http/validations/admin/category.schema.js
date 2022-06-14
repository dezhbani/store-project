const Joi = require("@hapi/joi");
const { mongoIDpaterns } = require("../../../utils/constant");
const addCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("عنوان باید 3-30 کاراکتر باشد")),
    parents: Joi.string().allow("").pattern(mongoIDpaterns).allow("").error(new Error("شناسه وارد شده صحیح نمیباشد"))
});
const editCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("عنوان باید 3-30 کاراکتر باشد"))
});

module.exports = {
    addCategorySchema,
    editCategorySchema
}