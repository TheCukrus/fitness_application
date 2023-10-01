const mongoose = require("mongoose")

const schemaCategories = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    urlPath: { type: String, required: true },
    imagePath: { type: String }
})

schemaCategories.set("toJSON", {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const model_Categories = mongoose.model("categories", schemaCategories, "categories")

module.exports = model_Categories