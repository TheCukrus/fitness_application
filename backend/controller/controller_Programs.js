const express = require("express")
const logger = require("../utils/logger.js")
const model_Programs = require("../models/model_Programs.js")
const model_User = require("../models/model_User.js")
const model_Rating = require("../models/model_Rating.js")

const controller_Programs = express.Router()

//GET All programs
controller_Programs.get("/", async (req, res) =>
{
    try
    {
        const data = await model_Programs.find({})

        res.status(200).json({ message: data })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//GET Program by ID
controller_Programs.get("/:id", async (req, res) =>
{
    const { id } = req.params

    if (!id)
    {
        return res.status(400).json({ message: "Id not found" })
    }

    try
    {
        const program = await model_Programs.findById(id)

        if (!program)
        {
            return res.status(404).json({ message: "Program not found" })
        }

        res.status(200).json({ message: program })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST add comment
controller_Programs.post("/:id", async (req, res) =>
{
    try
    {

        if (!req.token?.id)
        {
            return res.status(401).json({ message: "Token invalid" })
        }

        const { id } = req.params

        if (!id)
        {
            return res.status(400).json({ message: "Id not found" })
        }

        const program = await model_Programs.findById(id)

        if (!program)
        {
            return res.status(404).json({ message: "Program not found" })
        }

        const { comment } = req.body

        if (!comment)
        {
            return res.status(404).json({ message: "Comment not found!" })
        }

        const existingComments = program.comments

        const newComment = {
            "username": req.token.username,
            "comment": comment,
            "data": Date.now()
        }

        program.comments = existingComments.concat(newComment)
        await program.save()

        res.status(200).json({ message: "New comment created" })

    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST Add rating
controller_Programs.post("/:id/rating", async (req, res) =>
{
    const { id } = req.params
    const { rating } = req.body
    const userId = req.token?.id

    if (!userId)
    {
        return res.status(401).json({ message: "To rate, you have to log in" })
    }

    if (!id)
    {
        return res.status(400).json({ message: "Program Id not found" })
    }

    try
    {
        // Find or create a rating
        const ratingRecord = await model_Rating.findOneAndUpdate(
            { program: id, user: userId },
            { rating: rating },
            { new: true, upsert: true }
        )

        // Recalculate the average rating for the program
        const ratings = await model_Rating.find({ program: id })
        const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0)
        const averageRating = totalRating / ratings.length

        // Respond with the new average rating
        res.status(200).json({ message: "Rating updated successfully", averageRating })

    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//GET Current rating of a program
controller_Programs.get("/:id/rating", async (req, res) =>
{
    const { id } = req.params

    if (!id)
    {
        return res.status(400).json({ message: "Program Id not found" })
    }

    try
    {
        const rating = await model_Rating.find({ program: id })

        if (rating.length === 0)
        {
            return res.status(404).json({ message: "No ratings for this program" })
        }

        const totalRating = rating.reduce((acc, curr) => acc + curr.rating, 0)
        const averageRating = totalRating / rating.length

        res.status(200).json({ message: averageRating })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST A new Program
controller_Programs.post("/", async (req, res) =>
{
    if (!req.token.id)
    {
        return res.status(401).json({ message: "Token invalid" })
    }

    const role = await model_User.findById(req.token.id)

    if (role.role !== "admin")
    {
        return res.status(401).json({ message: "You have no access" })
    }

    const { name, category, price, description, whatYoullGet, photo_path } = req.body

    if (!name)
    {
        return res.status(400).json({ message: "Name field must not be empty!" })
    }

    if (!category)
    {
        return res.status(400).json({ message: "Category field must not be empty!" })
    }

    if (!price)
    {
        return res.status(400).json({ message: "Price field must not be empty!" })
    }

    if (!description)
    {
        return res.status(400).json({ message: "Description field must not be empty!" })
    }

    if (!whatYoullGet)
    {
        return res.status(400).json({ message: "What youll get field must not be empty!" })
    }

    if (!photo_path)
    {
        return res.status(400).json({ message: "Photo_path field must not be empty!" })
    }

    try
    {
        const program = await model_Programs.find({ name })

        if (program.length > 0)
        {
            return res.status(400).json({ message: "Program name is taken!" })
        }

        await model_Programs.create({
            "name": name,
            "category": category,
            "price": price,
            "description": description,
            "whatYoullGet": whatYoullGet,
            "photo_path": photo_path
        })

        res.status(200).json({ message: "Program created successfull" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//PUT Update program
controller_Programs.put("/:id", async (req, res) =>
{
    if (!req.token.id)
    {
        return res.status(401).json({ message: "Token invalid" })
    }

    const { id } = req.params
    const { body } = req.body

    if (!id)
    {
        return res.status(400).json({ message: "Id not found" })
    }

    try
    {
        const program = await model_Programs.findById(id)

        if (!program)
        {
            return res.status(404).json({ message: "Program not found" })
        }

        const modifiedData = await model_Programs.findByIdAndUpdate(id, body)

        if (!modifiedData)
        {
            return res.status(400).json({ message: "Data not modified!" })
        }

        res.status(200).json({ message: "Data modified!" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//DELETE Remove program
controller_Programs.delete("/:id", async (req, res) =>
{
    if (!req.token.id)
    {
        return res.status(401).json({ message: "Token invalid" })
    }

    try
    {
        const { id } = req.params

        if (!id)
        {
            return res.status(400).json({ message: "Id not found" })
        }

        const remove_Program = await model_Programs.findByIdAndRemove(id)
        res.status(200).json({ message: "Program removed!" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controller_Programs