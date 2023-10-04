const express = require("express")
const bcrypt = require("bcrypt")
const logger = require("../utils/logger.js")
const model_User = require("../models/model_User.js")

const controller_User = express.Router()

//GET All users
controller_User.get("/", async (req, res) =>
{
    try
    {
        const users = await model_User.find({})
        res.status(200).json({ message: users })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//GET User by ID
controller_User.get("/:id", async (req, res) =>
{
    try
    {
        const { id } = req.params

        if (!id)
        {
            return res.status(400).json({ message: "id not found!" })
        }

        const user = await model_User.findById(id)

        if (!user)
        {
            return res.status(400).json({ message: "User by this id not found!" })
        }

        res.status(200).json({ message: user })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

//POST create new user
controller_User.post("/", async (req, res) =>
{
    try
    {
        const { name, username, email, password } = req.body

        if (!username)
        {
            return res.status(400).json({ message: "Username field is empty" })
        }

        if (!email)
        {
            return res.status(400).json({ message: "Email field is empty" })
        }

        if (!password)
        {
            return res.status(400).json({ message: "Password field is empty" })
        }

        if (username.length < 3)
        {
            return res.status(400).json({ message: "Username must contain at least 3 characters" })
        }

        if (password.length < 8)
        {
            return res.status(400).json({ message: "Password must contain at least 8 characters" })
        }

        const setRounds = 10
        const passwordHash = await bcrypt.hash(password, setRounds)

        const usernameChecker = await model_User.find({ username })

        if (usernameChecker.length !== 0)
        {
            return res.status(400).json({ message: "Username is taken" })
        }

        const emailChecker = await model_User.find({ email })

        if (emailChecker.length !== 0)
        {
            return res.status(400).json({ message: "Email is taken" })
        }

        await model_User.create({
            "username": username,
            "email": email,
            "name": name,
            "password": passwordHash
        })

        res.status(201).json({ message: "User created" })
    }
    catch (err)
    {
        logger.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})
module.exports = controller_User