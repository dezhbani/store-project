const { default: mongoose } = require("mongoose");

const RoleSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    permission: {type: [mongoose.Types.ObjectId], ref: "premission", default: []}
}, {
    toJSON: {
        virtuals: true
    }
})

module.exports = {
    roleModel: mongoose.model("role", RoleSchema)
}