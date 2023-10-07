const express = require("express")
const logger = require("../utils/logger.js")
const model_User = require("../models/model_User.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../utils/config.js")

const controller_Login = express.Router()

controller_Login.post("/", async (req, res) =>
{
    try
    {
        const { username, password } = req.body

        if (!username)
        {
            return res.status(400).json({ message: "Username input field is empty!" })
        }

        if (!password)
        {
            return res.status(400).json({ message: "Password input field is empty!" })
        }

        const user = await model_User.findOne({ $or: [{ "username": username }, { "email": username }] })

        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.password)

        if (!(user && passwordCorrect))
        {
            return res.status(401).json({ message: "Invalid username or password!" })
        }

        const userForToken = {
            username: user.username,
            id: user.id
        }

        const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: 60 * 60 })

        res.status(200).send({ token, username: user.username })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = controller_Login