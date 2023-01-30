const { Controllers } = require("../controllers");
const { conversationModel } = require("../../models/conversation");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
class NamespaceController extends Controllers{
    async addNamespace(req, res, next){
        try {
            const {title, endpoint} = req.body;
            await this.findNamespaceWithEndpoint(endpoint)
            const namespace = await conversationModel.create({title, endpoint});
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                message: "فضا ایجاد شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfNamespace(req, res, next){
        try {
            const namespaces = await conversationModel.find({}, {room: 0});
            return res.status(httpStatus.Ok).json({
                statusCode: httpStatus.OK,
                namespaces
            })
        } catch (error) {
            next(error)
        }
    }
    async findNamespaceWithEndpoint(endpoint){
        const conversation = await conversationModel.findOne({endpoint});
        console.log(conversation)
        if(conversation) throw createHttpError.BadRequest("این اسم قبلا انتخاب شده")
    }
}

module.exports = {
    NamespaceController: new NamespaceController()
}