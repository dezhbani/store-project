const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const blogSchema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId,ref: "user", required: true},
    title : {type: String, required: true},
    short_text : {type: String, required: true},
    text : {type: String, required: true},
    image : {type: String, required: true},
    tags : {type: [String], default: []},
    category : {type: mongoose.Types.ObjectId, ref: "category", required: true},
    comments: {type: [CommentSchema], default: []},
    like : {type: [mongoose.Types.ObjectId], ref: "user",default: []},
    dislike : {type: [mongoose.Types.ObjectId], ref: "user",default: []},
    bookmark : {type: [mongoose.Types.ObjectId], ref: "user",default: []}
}, {
    timestamps: true,
    versionKey: false,
    toJSON : {
        virtuals: true
    }
});
blogSchema.virtual("user", {
    ref : "user",
    localField : "_id",
    foreignField: "author"
})
blogSchema.virtual("category_detail", {
    ref : "category",
    localField : "_id",
    foreignField: "category"
})
blogSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})
module.exports = {
    blogModel: mongoose.model("blog", blogSchema)
}