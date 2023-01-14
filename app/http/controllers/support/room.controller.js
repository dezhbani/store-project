const { Controllers } = require("../../controllers");

class roomController extends Controllers{
    addRoom(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    roomController: new roomController()
}