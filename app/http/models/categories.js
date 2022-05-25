const { default: mongoose, Types } = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, default: undefined}
});

module.exports = {
    catergoryModel: mongoose.model("category", Schema)
}