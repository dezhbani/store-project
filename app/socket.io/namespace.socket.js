const { conversationModel } = require("../http/models/conversation");

module.exports = class namespaceSocket{
    #io;
    constructor(io){
        this.#io = io
    }
    initConnection(){
        this.#io.on("connection", async socket => {
            console.log("this.#io");
            const namespaces = await conversationModel.find({}, {title: 1, endpoint: 1}).sort({_id: -1});
            socket.emit("namespacesList", namespaces)
        })
    }
    async createNamespacesConnection(){
        const namespaces = await conversationModel.find({}, {rooms: 1, endpoint: 1}).sort({_id: -1});
        for (const namespace of namespaces) {
            this.#io.of(`/${namespace.endpoint}`).on("connection", async socket => {
                const conversation = await conversationModel.findOne({endpoint: namespace.endpoint}, {rooms: 1}).sort({_id: -1});
                // console.log(conversation)
                socket.on("joinRoom", roomName => {
                    console.log(roomName)
                })
                socket.emit("roomList", conversation.rooms)
            })
        }
    }
}