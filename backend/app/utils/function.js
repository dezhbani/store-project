const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { userModel } = require("../http/models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant");
const redisClient = require("./init-redis");

function randomNumber(){
    return Math.floor((Math.random() * 90000) + 10000)
}
async function signAccessToken(userID){
    return new Promise(async (resolve, reject) =>{
        const user = await userModel.findById(userID)
        const payload = {
            mobile: user.mobile
        };
        const option = {
            expiresIn: "1h"
        };
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, option, (err, token) =>{
                if(err) reject(createError.InternalServerError("خطای سروری رخ داد"));
            resolve(token)
        })
    })
}
async function signRefreshToken(userID){
    return new Promise(async (resolve, reject) =>{
        const user = await userModel.findById(userID)
        // console.log(typeof "" + userID)
        const payload = {
            mobile: user.mobile
        };
        const option = {
            expiresIn: "1y"
        };
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, option, async (err, token) =>{
                if(err) reject(createError.InternalServerError("خطای سروری رخ داد"));
                await redisClient.set("" + userID, token, {
                    EX: 31536000
                })
            resolve(token)
        })
    })
}
async function verifyRefreshToken(token){
        return new Promise((resolve, reject) => {
            JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) =>{
                if(err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
                const {mobile} = payload || {};
                const user = await userModel.findOne({mobile}, {password: 0, otp: 0});
                if(!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"));
                console.log(user._id)
                const refreshToken = await redisClient.get("" + user._id)
                console.log(refreshToken)
                if(token === refreshToken) return resolve(mobile);
                reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"))
            })
        })
}
module.exports = {
    randomNumber,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}