const { verifyTokenInGraphql } = require("../../http/middlewares/verifyAccessToken");

const checkToken = async(context) => {
    const {req, res} = context;
    req.user = await verifyTokenInGraphql(req, res)
}

module.exports = {
    checkToken
}