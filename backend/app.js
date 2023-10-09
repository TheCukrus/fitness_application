const express = require("express")
const mongoose = require("mongoose")
const config = require("./utils/config.js")
const logger = require("./utils/logger.js")
const controller_Programs = require("./controller/controller_Programs.js")
const controller_Categories = require("./controller/controller_Categories.js")
const controller_User = require("./controller/controller_User.js")
const controller_Login = require("./controller/controller_Login.js")
const controller_Admin = require("./controller/controller_Admin.js")
const middleware = require("./utils/middleware.js")
const cors = require("cors")

const app = express()

// const frontendBuildPath = path.resolve(__dirname, "..", "frontend", "build")

mongoose.connect(config.MONGODB)
    .then(() => logger.info("Connect to mongoDB"))
    .catch((err) => logger.error("Error connecting to mongoDB", err.message))


app.use(cors())
app.use(express.json())
// app.use(express.static(frontendBuildPath))
app.use(middleware.tokenExtractor)

app.use("/api/v1/program", middleware.tokenExtractor, controller_Programs)
app.use("/api/v1/categories", middleware.tokenExtractor, controller_Categories)
app.use("/api/v1/user", middleware.tokenExtractor, controller_User)
app.use("/api/v1/login", middleware.tokenExtractor, controller_Login)
app.use("/api/v1/admin", middleware.tokenExtractor, controller_Admin)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app