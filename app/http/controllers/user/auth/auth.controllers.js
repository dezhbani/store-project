const createError = require("http-errors");
const { randomNumber } = require("../../../../utils/function");
const { userModel } = require("../../../models/user");
const { authSchema } = require("../../../validations/user/auth.schema");

class userAuthControllers{
    async login(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            const { mobile } = req.body;
            const code = randomNumber()
            return res.status(200).send("ورود شما با موفقیت انجام شد");
        } catch (error) {
            next(createError.BadRequest(error.message));
        }
    }
    async saveUser(mobile, code){
        const result = await this.checkExistUser(mobile);
        if(result){
            return (await this.updateUser(mobile, {
                otp: {
                    code,
                    ex
                }
            }))
        }
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