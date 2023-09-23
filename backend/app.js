const express = require("express")
const mongoose = require("mongoose")
const config = require("./utils/config.js")
const logger = require("./utils/logger.js")

const app = express()

const frontendBuildPath = path.resolve(__dirname, "..", "frontend", "build")

mongoose.connect(config.MONGODB)
    .then(() => logger.info("Connect to mongoDB"))
    .catch((err) => logger.error("Error connecting to mongoDB", err.message))


app.use(cors())
app.use(express.json())
// app.use(express.static(frontendBuildPath))

module.exports = app