const mongoose = require("mongoose")

const schema_Programs = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    photo_path: { type: String, required: true }
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