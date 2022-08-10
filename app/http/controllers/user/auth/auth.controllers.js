const createError = require("http-errors");
const { sendSMS } = require("../../../../../app")
const { ROLES } = require("../../../../utils/constant");
const { randomNumber, signAccessToken, verifyRefreshToken, signRefreshToken } = require("../../../../utils/function");
const { userModel } = require("../../../models/user");
const { checkOtpSchema, getOtpSchema } = require("../../../validations/user/auth.schema");
const { Controllers } = require("../../controllers");

class userAuthControllers extends Controllers {
    async getOTP(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body)
            const { mobile } = req.body;
            const code = randomNumber();
            const result = await this.saveUser(mobile, code)
            if (!result) return createError.Unauthorized("ورود شما انجام نشد")
            const sendResult = await sendSMS(mobile, code)
            if (!sendResult) return createError.Unauthorized("کد تایید ارسال نشد")
            return res.status(200).send({
                data: {
                    statusCode: 200,
                    data: {
                        message: "کد تایید ارسال شد",
                        mobile
                    }
                }
            });
        } catch (error) {
            console.log(error)
            next(createError.BadRequest(error.message));
        }
    }
    async checkOTP(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body);
            const { mobile, code } = req.body;
            const user = await userModel.findOne({ mobile })
            if (!user) throw createError.NotFound("کاربر یافت نشد");
            if (user.otp.code != code) throw createError.Unauthorized("کد تایید صحیح نمیباشد");
            const now = Date.now();
            if (+user.otp.expireIn < +now) throw createError.Unauthorized("کد تایید منقضی شده");
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            return res.json({
                accessToken,
                refreshToken
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const mobile = await verifyRefreshToken(refreshToken);
            const user = await userModel.findOne({ mobile });
            const accessToken = await signAccessToken(user._id);
            const newRefreshToken = await signRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(mobile, code) {
        let otp = {
            code,
            expireIn: (new Date().getTime() + 120000)
        }
        const result = await this.checkExistUser(mobile);
        if (result) return (await this.updateUser(mobile, { otp }))
        return !!(await userModel.create({
            mobile,
            otp,
            roles: [ROLES.USER]
        }))
    }
    async checkExistUser(mobile) {
        const user = await userModel.findOne({ mobile });
        return !!user
    }
    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", 0, undefined, null, "0", NaN].includes(objectData[key])) delete objectData[key];
        })
        const resultUpdate = await userModel.updateOne({ mobile }, { $set: objectData });
        return !!resultUpdate.modifiedCount
    }
}

module.exports = {
    userAuthControllers: new userAuthControllers()
}