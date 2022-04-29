const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId, required: true},
    title : {type: String, required: true},
    text : {type: String, required: true},
    image : {type: String, required: true},
    tags : {type: [String], default: []},
    category : {type: mongoose.Types.ObjectId, required: true},
    coments: {type: [], default: []},
    like : {type: mongoose.Types.ObjectId, default: []},
    dislike : {type: mongoose.Types.ObjectId, default: []},
    bookmark : {type: mongoose.Types.ObjectId, default: []}

});

module.exports = {
    blogModel: mongoose.model("blog", Schema)
}