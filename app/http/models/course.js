const { default: mongoose } = require("mongoose");
const { timeOfCourse } = require("../../utils/function");
const { CommentSchema } = require("./public.schema");
const episodeSchema = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "lock"},
    time: {type: String, required: true, default: "00:00:00"},
    videoAddress: {type: String, required: true}
}, {
    toJSON: {
        virtuals: true
    }
})
episodeSchema.virtual("videoURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
})
const chapterSchema = mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: ""},
    episodes: {type: [episodeSchema], default: []}
})
const courseSchema = new mongoose.Schema({
    title : {type: String, required: true},
    short_text : {type: String, required: true},
    text : {type: String, required: true},
    image : {type: String, required: true},
    tags : {type: [String], required: true},
    category : {type: mongoose.Types.ObjectId, required: true},
    comments : {type: [CommentSchema], default: []},
    likes : {type: [mongoose.Types.ObjectId], ref:"user", default: []},
    bookmarks : {type: [mongoose.Types.ObjectId], ref:"user", default: []},
    price : {type: Number, default:0},
    discount : {type: Number, default:0},
    status: {type: String, default: "not started"}, // not started, holding, complated
    type : {type: String, default:"free", required: true}, // free, cash, special
    teacher : {type: mongoose.Types.ObjectId, ref: "user", required: true},
    chapter: {type: [chapterSchema], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: "user"}
},{
    toJSON: {
        virtuals: true
    }
});

courseSchema.index({title: "text", short_text: "text", text: "text"});

courseSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})
courseSchema.virtual("totalTime").get(function(){
    return timeOfCourse(this.chapter || []);

})

module.exports = {
    courseModel: mongoose.model("course", courseSchema)
}