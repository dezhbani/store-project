const { StatusCodes: httpStatus } = require("http-status-codes");
const { deleteInvalidProperties } = require("../../../../utils/function");
const { userModel } = require("../../../models/user");
const { Controllers } = require("../../controllers");

class UserController extends Controllers{
    async searchInUsers(req, res, next){
        try {
            const {search} = req.query;
            console.log(!!search)

            let users, databaseQuery;
            databaseQuery = {$search : search}
            const mobileRegex = (/^09[0-9]{9}$/)
            if(!search){ 
                users = await userModel.find({});
            }else if(mobileRegex.test(search)){
                users = await userModel.find({mobile: search})
                console.log("mobile")
            }else{
                users = await userModel.find({$text: databaseQuery})
            }
            return res.status(httpStatus.OK).json({
                statusCode:httpStatus.OK,
                data:{
                    users
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    async updateUserProfile(req, res, next){
        try {
            const userID = req.user._id;
            const data = req.body;
            const BlackListFields = ["mobile", "otp", "bills", "discount", "roles", "courses", "id", "_id"]
            deleteInvalidProperties(data, BlackListFields)
            const profileUpdateResult = await userModel.updateOne({_id: userID}, { $set: data })
            if(!profileUpdateResult.modifiedCount) throw createHttpError.InternalServerError("به روزسانی انجام نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روزرسانی پروفایل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    UserController: new UserController()
}