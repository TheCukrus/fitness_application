const express = require("express")
const logger = require("../utils/logger.js")
const model_Programs = require("../models/model_Programs.js")

const controller_Programs = express.Router()

//GET All programs
controller_Programs.get("/", async (req, res) =>
{
    try
    {
        const data = await model_Programs.find({})

        res.status(200).json({ message:data })
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

//POST A new Program
controller_Programs.post("/", async (req, res) =>
{
    const { name, category, price, description, photo_path } = req.body

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