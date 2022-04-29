const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({

});

module.exports = {
    paymentModel: mongoose.model("payment", Schema)
}