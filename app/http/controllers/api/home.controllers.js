const createError = require("http-errors");
const {authSchema}  = require("../../validations/user/auth.schema");
const { Controllers } = require("../controllers");

module.exports = new (class HomeController extends Controllers {
    async indexPage(req, res, next) {
      try {
        return res.status(200).send("Index Page Store " + this.testMethod());
      } catch (error) {
        next(error);
      }
    }
  })()
