const express = require("express")
const model_Categories = require("../models/model_Categories.js")
const model_User = require("../models/model_User.js")
const logger = require("../utils/logger.js")

const controller_Categories = express.Router()

//GET All categories
controller_Categories.get("/", async (req, res) =>
{
    try
    {
        const categories = await model_Categories.find({})
        res.status(200).json({ message: categories })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST Create new category
controller_Categories.post("/", async (req, res) =>
{
    const { title, description, urlPath, imagePath } = req.body

    if (!req.token.id)
    {
        return res.status(401).json({ message: "Token invalid" })
    }

    const role = await model_User.findById(req.token.id)

    if (role.role !== "admin")
    {
        return res.status(401).json({ message: "You have no access" })
    }


    if (!title)
    {
        return res.status(400).json({ message: "Title is missing!" })
    }

    if (!description)
    {
        return res.status(400).json({ message: "Description is missing!" })
    }

    if (!urlPath)
    {
        return res.status(400).json({ message: "Url path is missing!" })
    }

    try
    {
        const categories = await model_Categories.find({ title })

        if (categories.length !== 0)
        {
            return res.status(400).json({ message: "This category already exist!" })
        }

        await model_Categories.create({ title, description, urlPath, imagePath })
        res.status(200).json({ message: "New category created" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//DELETE Remove category from list
controller_Categories.delete("/:id", async (req, res) =>
{
    try
    {
        const id = req.params.id

        if (!id)
        {
            return res.status(400).json({ message: "No Id given" })
        }

        const role = await model_User.findById(req.token.id)

        if (role.role !== "admin")
        {
            return res.status(401).json({ message: "You have no access" })
        }

        if (!req.token.id)
        {
            return res.status(401).json({ message: "Token invalid" })
        }

        const result = await model_Categories.findByIdAndDelete(id)

        if (!result)
        {
            return res.status(400).json({ message: "Item not found!" })
        }

        res.status(200).json({ message: "Category removed successfully" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controller_Categories