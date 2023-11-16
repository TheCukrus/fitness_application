const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    quantity: { type: Number, required: true, min: 1, default: 1 }
})

const cart_Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    },
    cartItems: [cartItemSchema],
    orderDate: { type: Date, default: Date.now }
})

cart_Schema.set("toJSON", {
    transform: (document, returnObject) =>
    {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
    }
})

const model_Cart = mongoose.model("Cart", cart_Schema, "Cart")

module.exports = model_Cart