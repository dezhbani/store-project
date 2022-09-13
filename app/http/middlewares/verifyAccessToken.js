const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");
const { userModel } = require("../models/user");

function getToken(headers) {
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if (token && ["bearer", "Bearer"].includes(bearer)) return token;
    return createHttpError.Unauthorized("حساب کاربری شناسایی نشد، وارد حساب کاربری خود شوید")
}

async function verifyToken(req, res, next) {
    const token = getToken(req.headers);
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
        try {
            if (err) return next(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"))
            const { mobile } = payload || {};
            const user = await userModel.findOne({ mobile }, { password: 0, otp: 0 });
            if (!user) return next(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            return next();
        } catch (error) {
            next(error)
        }
    })
}

async function verifyTokenInGraphql(req, res) {
    try { 
        const token = getToken(req.headers);
        const { mobile } = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
        const user = await userModel.findOne({ mobile }, { password: 0, otp: 0 });
        if (!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد");
        return user
    } catch (error) {
        // res.json(createHttpError.Unauthorized(error.message))
        throw new createHttpError.Unauthorized("مجددا وارد حساب کاربری خود شوید")
    }
    
}

module.exports = {
    verifyToken,
    verifyTokenInGraphql
}