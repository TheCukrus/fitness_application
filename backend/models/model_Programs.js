const mongoose = require("mongoose")

const schema_Programs = new mongoose.Schema({
    name: { type: String },
    category: { type: String },
    price: { type: String },
    description: { type: String },
    photo_path: { type: String }
})

schema_Programs.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const model_Programs = mongoose.model("Program", schema_Programs, "program")

module.exports = model_Programs