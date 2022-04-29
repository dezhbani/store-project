const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type: String, required: true}
});

module.exports = {
    catergoryModel: mongoose.model("catergory", Schema)
}