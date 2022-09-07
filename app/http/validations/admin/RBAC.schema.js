const Joi = require("@hapi/joi");
const { mongoIDpaterns } = require("../../../utils/constant");

const addRoleSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("عنوان نقش باید 3-30 کاراکتر باشد")),
    description : Joi.string().min(3).max(100).error(new Error("توضیحات نقش ها صحیح نمی باشد")),
    permission : Joi.array().items(Joi.string().pattern(mongoIDpaterns)).error(new Error("دسترسی های ارسال شده صحیح نمی باشد"))
});
const addPermissionSchema = Joi.object({
    name : Joi.string().min(3).max(30).error(new Error("اسم دسترسی ها صحیح نمیباشد")),
    description : Joi.string().min(3).max(100).error(new Error("توضیحات دسترسی ها صحیح نمی باشد"))
});

module.exports = {
    addRoleSchema,
    addPermissionSchema
}