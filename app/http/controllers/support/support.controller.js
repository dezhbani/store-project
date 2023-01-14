const { Controllers } = require("../controllers");

class SupportController extends Controllers{
    renderChatRoom(req, res, next){
        try {
            return res.render("chat.ejs")
        } catch (error) {
            next(error)
        }
    }
}

module.exports={
    SupportController: new SupportController()
}