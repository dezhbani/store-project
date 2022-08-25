const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");
const Episodes = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "lock"},
    time: {type: String, required: true, default: "00:00:00"},
    videoAddress: {type: String, required: true}
})
const Chapter = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: ""},
    episodes: {type: [Episodes], default: []}
})
const courseSchema = new mongoose.Schema({
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
    status: {type: String, default: "not started"}, // not started, holding, complated
    type : {type: String, default:"free", required: true}, // free, cash, special
    time : {type: String, default: "00:00:00"},
    teacher : {type: mongoose.Types.ObjectId, ref: "user", required: true},
    chapter: {type: [Chapter], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: "user"}
});
courseSchema.index({title: "text", short_text: "text", text: "text"});
module.exports = {
    courseModel: mongoose.model("course", courseSchema)
}