const { Controllers } = require("../../controllers");

class messageController extends Controllers{
    addMessage(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    messageController: new messageController()
}