const { userAuthControllers } = require("../../http/controllers/user/auth/auth.controllers");

const router = require("express").Router();

router.post("/get-otp", userAuthControllers.getOTP);
router.post("/check-otp", userAuthControllers.checkOTP);
router.post("/refresh-token", userAuthControllers.refreshToken);

module.exports = {
    userAuthRoutes: router
}