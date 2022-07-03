const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Schema = new mongoose.Schema({
    title : {type: String, required: true},
    short_text : {type: String, required: true},
    text : {type: String, required: true},
    images : {type: [String], required: true},
    tags : {type: [String], required: true},
    category : {type: mongoose.Types.ObjectId, required: true},
    comments : {type: [CommentSchema], default: []},
    likes : {type: [mongoose.Types.ObjectId], default: []},
    dislikes : {type: [mongoose.Types.ObjectId], default: []},
    bookmarks : {type: [mongoose.Types.ObjectId], default: []},
    price : {type: Number, default:0},
    discount : {type: Number, default:0},
    count : {type: Number},
    type : {type: String, required: true}, // virtual - phisical
    format : {type: String},
    supplier : {type: mongoose.Types.ObjectId, required: true},
    details : {type: String, default: {
        length: "",
        weight: "",
        hight: "",
        width: "",
        colors: [],
        madein: [],
    }},
    
});

module.exports = {
    productModel: mongoose.model("product", Schema)
}