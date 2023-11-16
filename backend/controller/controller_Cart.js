const express = require("express")
const logger = require("../utils/logger.js")
const model_Cart = require("../models/model_Cart.js")
const model_Programs = require("../models/model_Programs.js")

const controller_Cart = express.Router()

//GET find current user's cart
controller_Cart.get("/", async (req, res) =>
{
    try
    {
        if (!req.token?.id)
        {
            return res.status(401).json({ message: "Token invalid" })
        }

        const cart = await model_Cart.findOne({ user: req.token.id }).populate("cartItems.program")

        if (!cart)
        {
            return res.status(404).json({ message: "Cart not found" })
        }

        res.status(200).json({ message: cart })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST add item to the cart
controller_Cart.post("/add", async (req, res) =>
{
    try
    {
        const { programId, quantity } = req.body
        const userId = req.token?.id

        if (!userId)
        {
            return res.status(400).json({ message: "User not authenticated" })
        }

        let cart = await model_Cart.findOne({ user: userId })

        if (!cart)
        {
            cart = new model_Cart({ user: userId, cartItems: [] })
        }

        //Check if the program exists
        const program = await model_Programs.findById(programId)

        if (!program)
        {
            return res.status(400).json({ message: "Program not found" })
        }

        //Add or update the item in the cart
        const cartItemIndex = cart.cartItems.findIndex(item => item.program.equals(programId))

        if (cartItemIndex > -1)
        {
            cart.cartItems[cartItemIndex].quantity += quantity
        }
        else
        {
            cart.cartItems.push({ program: programId, quantity })
        }

        await cart.save()
        res.status(201).json({ message: "Item added to cart" })

    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST Remove an item from the cart
controller_Cart.delete("/remove/:programId", async (req, res) =>
{
    try
    {
        const { programId } = req.params
        const userId = req.token?.id

        if (!userId)
        {
            return res.status(401).json({ message: "User not authenticated" })
        }

        const cart = await model_Cart.findOne({ user: userId })

        if (!cart)
        {
            return res.status(404).json({ message: "Cart not found" })
        }

        //Remove the item from the cart
        cart.cartItems = cart.cartItems.filter(item => !item.program.equals(programId))

        await cart.save()
        res.status(200).json({ message: "Item removed from cart" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controller_Cart