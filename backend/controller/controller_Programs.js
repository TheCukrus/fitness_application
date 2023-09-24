const express = require("express")
const logger = require("../utils/logger.js")
const model_Programs = require("../models/model_Programs.js")

const controller_Programs = express.Router()

//GET All programs
controller_Programs.get("/", async (req, res) =>
{
    try
    {
        const data = await model_Programs.get({})

        res.status(200).json({ data })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST a new Program
controller_Programs.post("/", async (req, res) =>
{
    const { name, category, price, description, photo_path } = req.body

    if (!name)
    {
        res.status(400).json({ message: "Name field must not be empty!" })
    }

    if (!category)
    {
        res.status(400).json({ message: "Category field must not be empty!" })
    }

    if (!price)
    {
        res.status(400).json({ message: "Price field must not be empty!" })
    }

    if (!description)
    {
        res.status(400).json({ message: "Description field must not be empty!" })
    }

    if (!photo_path)
    {
        res.status(400).json({ message: "Photo_path field must not be empty!" })
    }

    try
    {

        const program = await model_Programs.find({ name })

        if (program)
        {
            res.status(400).json({ message: "Program name is taken!" })
        }

        await model_Programs.create({
            name, category, price, description, photo_path
        })

        res.status(200).json({ message: "Program created successfull" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controller_Programs