const { default: mongoose, Types } = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, default: undefined}
}, {
    id: false,
    toJSON:{
        virtuals: true
    }
});
Schema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});
function autoPopulate(next){
    this.populate([{path: "children", select:{id: 0, __v: 0} }]);
    next()
}
Schema.pre("find", autoPopulate).pre("findOne", autoPopulate);

module.exports = {
    catergoryModel: mongoose.model("category", Schema)
}