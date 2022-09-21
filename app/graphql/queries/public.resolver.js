const { verifyTokenInGraphql } = require("../../http/middlewares/verifyAccessToken");

const checkToken = async(context) => {
    const {req, res} = context;
    req.user = await verifyTokenInGraphql(req, res)
    return req.user
}

module.exports = {
    checkToken
}