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

module.exports = controller_Programs