const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String},
    eamail: {type: String},
    mobile: {type: String},
    password: {type: String},
    otp: {type: Object, default: {
        code: 0,
        expireIn: 0
    }},
    bills: {type: [], default: []},
    discuont: {type: Number, default: 0},
    birthday: {type: String},
    roles: {type: [String], default: ["USER"]}

});

module.exports = {
    userModel: mongoose.model("user", Schema)
}