const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { userModel } = require("../http/models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant");
const redisClient = require("./init-redis");
const path = require("path");
const fs = require("fs");
const { result } = require("@hapi/joi/lib/base");

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
function bindImagePath(uploadPath, fileName){
    const image = path.join(uploadPath, fileName).replace(/\\/g, "/");
    return image;
}
function setDetails(body){
    const {type, width, height, weight, length, colors} = body;
    console.log(colors)
    let details = {
        width: 0, 
        height: 0,
        weight: 0,
        length: 0
    }
    if(colors?.length > 0) details.colors = colors;
    if(type === "virtual" && width === '' && height === '' && weight === ''&& length === ''){
        details = details 
    }else if(type === "phisical" &&  width !== '' && height !== '' && weight !== ''&& length !== '' ){
        if (width) details.width = width;
        if (height) details.height = height;
        if (weight) details.weight = weight;
        if (length) details.length = length;
    }
    console.log(details)
    return details
}
function copyObject(object){
    return JSON.parse(JSON.stringify(object))
}
function deleteInvalidProperties(data = {}, blackListFields){
    let nullishData = ["", " ", "0", 0, null, undefined];
    Object.keys(data).forEach(key => {
        if(blackListFields.includes(data[key])) delete data[key];
        if(typeof data[key] === "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key];
        if(nullishData.includes(data[key])) delete data[key];
    })
}

function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minutes, percent] = String(total).split(".");
    let second = Math.round((percent * 60) / 100).toString().substring(0, 2);
    let houre = 0;
    if (minutes > 60) {
        total = minutes / 60
         let [h1, percent] = String(total).split(".");
         houre = h1,
         minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
    }
    return (houre + ":" + minutes + ":" +second)
}

function timeOfCourse(chapters = []) {
    let time, second = 0;
    for (const chapter of chapters) {
        if(Array.isArray(chapter?.episodes)){
            for (const episode of chapter.episodes) {
                if(episode?.time) time = episode.time.split(":");  //[hour, minute, second]
                else time = "00:00:00".split(":");
                if(time.length == 3){
                    second += Number(time[0]) * 3600; // convert hour to second
                    second += Number(time[1]) * 60; // convert minute to second
                    second += Number(time[2]); 
                }else if(time.length == 2){
                    second += Number(time[0]) ; // convert minute to second
                    second += Number(time[1]) * 60; 
                }
            }
        }
    }
    return getTime(second)
}

module.exports = {
    randomNumber,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    deleteFileInPublic,
    listOfImages,
    copyObject,
    setDetails,
    deleteInvalidProperties,
    bindImagePath,
    getTime,
    timeOfCourse
}