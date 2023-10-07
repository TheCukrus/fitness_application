const express = require("express")
const logger = require("../utils/logger.js")
const model_User = require("../models/model_User.js")

const controller_Admin = express.Router()

controller_Admin.get("/", async (req, res) =>
{
    try
    {
        if (!req.token?.id)
        {
            return res.status(401).json({ message: "Not authorized" })
        }

        const userRole = await model_User.findById(req.token.id)

        if (userRole.role !== "admin")
        {
            return logger.info({ message: "Have no access" })
        }

        res.status(200).json({ message: "Access granted" })

    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controller_Admin