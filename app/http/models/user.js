const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {type: String, default: "matin"},
    last_name: {type: String, default: "dezhbani"},
    username: {type: String},
    email: {type: String},
    mobile: {type: String},
    password: {type: String},
    otp: {type: Object, default: {
        code: 0,
        expireIn: 0
    }},
    bills: {type: [], default: []},
    discuont: {type: Number, default: 0},
    birthday: {type: String},
    role: {type: String, default: "USER"},
    courses: {type: [mongoose.Types.ObjectId], ref: "course", default: []}
},{
    timestamps: true,
    toJSON:{
        virtuals: true
    }
});
userSchema.index({first_name: "text", last_name: "text", username: "text", mobile: "text", email: "text"})

module.exports = {
    userModel: mongoose.model("user", userSchema)
}