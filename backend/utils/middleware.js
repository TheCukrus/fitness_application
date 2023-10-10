const logger = require("./logger.js")
const jwt = require("jsonwebtoken")
const config = require("./config.js")

const unknownEndpoint = (req, res) =>
{
    res.status(404).json({ error: "Unknown endpoint!" })
}

const errorHandler = (err, req, res, next) =>
{
    logger.error(err.message)

    if (err.name === "CastError")
    {
        return res.status(400).json({ error: "Malformatted id" })
    }
    else if (err.name === "ValidationError")
    {
        return res.status(400).json({ error: err.message })
    }
    else if (err.name === "JsonWebTokenError")
    {
        return res.status(401).json({ error: err.message })
    }
    else if (err.name === "TokenExpiredError")
    {
        return res.status(401).json({ error: "Token expired" })
    }

    next(err)
}

const tokenExtractor = async (req, res, next) =>
{
    let authorization = req.get("authorization")
    if (authorization && authorization.startsWith("Bearer "))
    {
        authorization = authorization.replace("Bearer ", "")
        try
        {
            const decodedToken = jwt.verify(authorization, config.JWT_SECRET)
            req.token = decodedToken
            next()
        }
        catch (err)
        {
            next(err)
        }
    }
    else
    {
        authorization = null
        next()
    }
}

module.exports = { tokenExtractor, errorHandler, unknownEndpoint }