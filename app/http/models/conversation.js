const { default: mongoose } = require("mongoose");
const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Types.ObjectId, ref:"user"},
    message: {type: String},
    dateTime: {type: String},
})
const roomSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    messages:{type: [messageSchema], default: []}
})
const conversationSchema = new mongoose.Schema({
    title: {type: String, required:true},
    endpoints: {type: String, required: true},
    romms: {type: [roomSchema], default: []}
})

module.exports = {
    conversationModel: mongoose.model("conversation", conversationSchema)
}