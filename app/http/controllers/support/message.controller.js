<<<<<<< Updated upstream
const { Controllers } = require("../../controllers");

class messageController extends Controllers{
=======
const { Controllers } = require("../controllers");

class MessageController extends Controllers{
>>>>>>> Stashed changes
    addMessage(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
<<<<<<< Updated upstream
}

module.exports = {
    messageController: new messageController()
=======
    getMessages(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    MessageController: new MessageController()
>>>>>>> Stashed changes
}