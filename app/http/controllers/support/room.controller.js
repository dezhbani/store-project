const createHttpError = require("http-errors");
const { Controllers } = require("../controllers");
const { conversationModel } = require("../../models/conversation");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { bindImagePath } = require("../../../utils/function");

class RoomController extends Controllers{
    async addRoom(req, res, next){
        try {
            const { name, description, filename, fileUploadPath, namespace } = req.body;
            console.log(namespace)
            await this.findNamespaceWithEndpoint(namespace);
            await this.findRoomWithName(name);
            const image = bindImagePath(fileUploadPath, filename);
            const room = { name, description, image};
            const conversation = await conversationModel.updateOne({endpoint: namespace}, {
                $push: {rooms: room}
            })
            if(conversation.modifiedCount == 0) throw createHttpError.InternalServerError("گروه ایجاد نشد");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                messages: "گروه ایجاد شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfRooms(req, res, next){
        try {
            const conversation = await conversationModel.find({}, {room: 1});
            return res.status(httpStatus.Ok).json({
                statusCode: httpStatus.OK,
                conversation: conversation.rooms
            })
        } catch (error) {
            next(error)
        }
    }
    async findRoomWithName(name){
        const room = await conversationModel.findOne({"rooms.name": name});
        // console.log(room)
        if(room) throw createHttpError.BadRequest("این اسم قبلا انتخاب شده")
    }
    async findNamespaceWithEndpoint(endpoint){
        const conversation = await conversationModel.findOne({endpoint});
        console.log(conversation)
        if(!conversation) throw createHttpError.NotFound("فضای مکالمه ای یافت نشد")
    }
}

module.exports = {
    RoomController: new RoomController()
}