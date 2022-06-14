const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "users", required: true},
    comment: {type: String, required: true},
    createAt: {type: Date, default: Date.now()},
    parent: {type: mongoose.Types.ObjectId}
})

const Schema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId, required: true},
    title : {type: String, required: true},
    short_text : {type: String, required: true},
    text : {type: String, required: true},
    image : {type: String, required: true},
    tags : {type: [String], default: []},
    category : {type: [mongoose.Types.ObjectId], required: true},
    comments: {type: [CommentSchema], default: []},
    like : {type: [mongoose.Types.ObjectId], ref: "users",default: []},
    dislike : {type: [mongoose.Types.ObjectId], ref: "users",default: []},
    bookmark : {type: [mongoose.Types.ObjectId], ref: "users",default: []}
}, {timestamps: true, versionKey: false});

module.exports = {
    blogModel: mongoose.model("blog", Schema)
}