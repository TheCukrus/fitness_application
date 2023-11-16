const mongoose = require("mongoose")

const schema_User = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minLength: 3 },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true, minLength: 8 },
    role: { type: String, default: "user" }
})

schema_User.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const model_User = mongoose.model("User", schema_User, "user")

module.exports = model_User