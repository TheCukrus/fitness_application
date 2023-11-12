const mongoose = require("mongoose")

const schema_Rating = new mongoose.Schema({
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "program",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, { timestamps: true })

const model_Rating = mongoose.model("rating", schema_Rating, "rating")

module.exports = model_Rating