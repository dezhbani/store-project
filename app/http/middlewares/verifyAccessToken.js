const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");
const { userModel } = require("../models/user");

function getToken(headers) {
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if (token && ["bearer", "Bearer"].includes(bearer)) return token;
    return createError.Unauthorized("حساب کاربری شناسایی نشد، وارد حساب کاربری خود شوید")
}

async function verifyToken(req, res, next) {
    const token = getToken(req.headers);
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
        try {
            if (err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const { mobile } = payload || {};
            const user = await userModel.findOne({ mobile }, { password: 0, otp: 0 });
            if (!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            return next();
        } catch (error) {
            next(error)
        }
    })
}

function checkRole(role) {
    return async function (req, res, next) {
        try {
            const user = req.user;
            if(user.roles.includes(role)) return next();
            throw createError.Forbidden("شما به این قسمت دسترسی ندارید");
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    verifyToken,
    checkRole
}