const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");
const Episodes = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "free"},
    time: {type: String, required: true, default: "00:00:00"}
})
const Chapter = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: ""},
    episodes: {type: [Episodes], default: []}
})
const Schema = new mongoose.Schema({
    title : {type: String, required: true},
    short_text : {type: String, required: true},
    text : {type: String, required: true},
    image : {type: String, required: true},
    tags : {type: [String], required: true},
    category : {type: mongoose.Types.ObjectId, required: true},
    comments : {type: [CommentSchema], default: []},
    likes : {type: [mongoose.Types.ObjectId], default: []},
    dislikes : {type: [mongoose.Types.ObjectId], default: []},
    bookmarks : {type: [mongoose.Types.ObjectId], default: []},
    price : {type: Number, default:0},
    discount : {type: Number, default:0},
    type : {type: String, default:"free", required: true}, // free, cash, special
    time : {type: String, default: "00:00:00"},
    teacher : {type: mongoose.Types.ObjectId, ref: "user", required: true},
    chapter: {type: [Chapter], default: []},
    students: {type: mongoose.Types.ObjectId, default: [], ref: "user"}
});

module.exports = {
    Courses: mongoose.model("course", Schema)
}