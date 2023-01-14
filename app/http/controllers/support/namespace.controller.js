const { Controllers } = require("../../controllers");

class NamespaceController extends Controllers{
    addNamespace(req, res, next){
        try {
            const {title, endpoint} = req.body;
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    NamespaceController: new NamespaceController()
}