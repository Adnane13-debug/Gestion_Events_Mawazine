const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, select: false},
    role: { type: String, required: true, enum: ["user", "admin"], default: "user"}
})

module.exports = mongoose.model("User", userSchema)