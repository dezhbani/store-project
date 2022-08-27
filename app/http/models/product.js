const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const productSchema = new mongoose.Schema({
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
    details : {type: Object, default: {
        length: "0",
        weight: "0",
        hight: "0",
        width: "0",
        colors: [],
    }},
    
}, {
    toJSON:{
        virtuals: true
    }
});

productSchema.index({title: "text", short_text: "text", text: "text"});
productSchema.virtual("imagesURL").get(function(){
    return this.images.map(image => `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`)
})
module.exports = {
    productModel: mongoose.model("product", productSchema)
}