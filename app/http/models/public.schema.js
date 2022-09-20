const { default: mongoose } = require("mongoose")

const answerSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false}
}, {
    timestamps:{
        createdAt: true
    }
})
const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    openToComment: {type: Boolean, default: true},
    answers: {type: [answerSchema], default: []}
}, {
    timestamps:{
        createdAt: true
    }
})

module.exports = {
    CommentSchema
}