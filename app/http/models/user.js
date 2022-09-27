const { default: mongoose } = require("mongoose");
const  productSchema = new mongoose.Schema({
    productID: {type: mongoose.Types.ObjectId, ref: "product"},
    count: {type: Number, default: 1}
})
const  courseSchema = new mongoose.Schema({
    courseID: {type: mongoose.Types.ObjectId, ref: "course"},
    count: {type: Number, default: 1}
})
const basketSchema = new mongoose.Schema({
    products: {type: [productSchema], default: []},
    courses: {type: [courseSchema], default: []},
})
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
    courses: {type: [mongoose.Types.ObjectId], ref: "course", default: []},
    basket: {type: basketSchema}
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