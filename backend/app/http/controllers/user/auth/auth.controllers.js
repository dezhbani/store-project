const createError = require("http-errors");
const { sendSMS } = require("../../../..");
const { EXPIRES_IN, ROLES } = require("../../../../utils/constant");
const { randomNumber } = require("../../../../utils/function");
const { userModel } = require("../../../models/user");
const { authSchema } = require("../../../validations/user/auth.schema");
const { Controllers } = require("../../controllers");

class userAuthControllers extends Controllers{
    async login(req, res, next) {
        try {
            await authSchema.validateAsync(req.body)
            const { mobile } = req.body;
            const code = randomNumber();
            const result = await this.saveUser(mobile, code)
            if(!result) throw createError.Unauthorized("ورود شما انجام نشد")
            // const sendResult = await sendSMS(mobile, code)
            // console.log(sendResult )
            // if(!sendResult) throw createError.Unauthorized("کد تایید ارسال نشد")
            return res.status(200).send({
                data: {
                    status: 200,
                    message: "کد تایید ارسال شد",
                    code,
                    mobile
                }
            });
        } catch (error) {
            next(createError.BadRequest(error.message));
        }
    }
    async saveUser(mobile, code){
        let otp = {
            code,
            expireIn: EXPIRES_IN
        }
        const result = await this.checkExistUser(mobile);
        if(result) return (await this.updateUser(mobile, {otp}))
        return !!(await userModel.create({
            mobile,
            otp, 
            roles: [ROLES]
        }))
    }
    async checkExistUser(mobile){
        const user = await userModel.findOne({mobile});
        return !!user
    }
    async updateUser(mobile, objectData = {}){
        Object.keys(objectData).forEach(key => {
            if(["", " ", 0, undefined, null, "0", NaN].includes(objectData[key])) delete objectData[key];
        })
        const resultUpdate = await userModel.updateOne({mobile}, {$set: objectData});
        return !!resultUpdate.modifiedCount
    }
}

module.exports = {
    userAuthControllers: new userAuthControllers()
}