const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");
const { userModel } = require("../models/user");

async function verifyToken(req, res, next){
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if(token && ["bearer", "Bearer"].includes(bearer)){
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) =>{
            if(err) return next(createError.Unauthorized("وارد حساب کربری خود شوید"))
            const {mobile} = payload || {};
            const user = await userModel.findOne({mobile}, {password: 0, otp: 0});
            if(!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            return next();
        })
    } 
    else return next(createError.Unauthorized("وارد حساب کربری خود شوید"))
}

module.exports = {
    verifyToken
}