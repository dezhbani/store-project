const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { userModel } = require("../http/models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant");
const redisClient = require("./init-redis");
const path = require("path");
const fs = require("fs");

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
            expiresIn: "1d"
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
            resolve(token);
        })
    })
}
async function verifyRefreshToken(token){
        return new Promise((resolve, reject) => {
            JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) =>{
                if(err) return reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
                const {mobile} = payload || {};
                const user = await userModel.findOne({mobile}, {password: 0, otp: 0});
                if(!user) return reject(createError.Unauthorized("حساب کاربری یافت نشد"));
                const refreshToken = await redisClient.get(`${user._id}`);
                if(!refreshToken) reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
                if(token === refreshToken) return resolve(mobile);
                reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
            })
        })
}

function deleteFileInPublic(fileAddress){
    if(fileAddress){
        const pathFile = path.join(__dirname, "..", "..", fileAddress);
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile); 
    }
}

function listOfImages(files, fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/"))
    } else{
        return []
    }
}

module.exports = {
    randomNumber,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteFileInPublic,
    listOfImages
}