const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { mongoIDpaterns } = require("../../utils/constant");

const IDvalidator = Joi.object({
    id: Joi.string().pattern(mongoIDpaterns).error(new Error(createHttpError.BadRequest("شناسه وارد شده صحیح نیست")))
})

module.exports = {
    IDvalidator
}