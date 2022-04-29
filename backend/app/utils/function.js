const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { userModel } = require("../http/models/user");
const { SECRET_KEY } = require("./constant");

function randomNumber(){
    return Math.floor((Math.random() * 90000) + 10000)
}
function signAccessToken(userID){
    return new Promise(async (resolve, reject) =>{
        const user = userModel.findById(userID)
        const payload = {
            mobile: user.mobile,
            userId: user._id
        };
        const secret = "";
        const option = {
            expiresIn: "1h"
        };
        JWT.sign(payload, SECRET_KEY, option, (err, token) =>{
            console.log(err)
            if(err) reject(createError.InternalServerError("خطای سروری رخ داد"));
            resolve(token)
        })
    })

}
module.exports = {
    randomNumber,
    signAccessToken
}