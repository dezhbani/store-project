const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type: String, required: true},
    short_desc : {type: String, required: true},
    full_desc : {type: String, required: true},
    images : {type: [String], required: true},
    tags : {type: [String], required: true},
    category : {type: mongoose.Types.ObjectId, required: true},
    comments : {type: [], default: []},
    like : {type: [mongoose.Types.ObjectId], default: []},
    dislike : {type: [mongoose.Types.ObjectId], default: []},
    bookmark : {type: [mongoose.Types.ObjectId], default: []},
    price : {type: Number, default:0},
    discount : {type: Number, default:0},
    count : {type: Number},
    type : {type: String, required: true},
    time : {type: String},
    format : {type: String},
    teacher : {type: mongoose.Types.ObjectId, required: true},
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