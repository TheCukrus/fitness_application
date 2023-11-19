import axios from "axios"

const baseUrl = "http://127.0.0.1:80/api/v1/program"

//Extracting token from localStorage
const getToken = () =>
{
    const tokenFromLocalstorage = window.localStorage.getItem("token")
    return tokenFromLocalstorage ? `Bearer ${JSON.parse(tokenFromLocalstorage).token}` : null
}

//Seting token to directly from login component
const setAuthorizationToken = (token) =>
{
    config.headers.authorization = token
}

//config file
const config = {
    headers: {
        "authorization": getToken()
    }
}

//GET All programs
const getAllPrograms = async () =>
{
    try
    {
        const programs = await axios.get(baseUrl)
        return programs.data.message
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//GET Program by Id
const getProgramById = async (id) =>
{
    try
    {
        const program = await axios.get(`${baseUrl}/${id}`)
        return program.data.message
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//POST Add new comment
const createComment = async (id, data) =>
{
    try
    {
        const comment = await axios.post(`${baseUrl}/${id}`, data, config)
        return { notification: comment.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//POST Create new program
const createProgram = async (data) =>
{
    try
    {
        const newProgram = await axios.post(baseUrl, data, config)
        return { notification: newProgram.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//GET Current average rating of a program
const getProgramRating = async (id) =>
{
    try
    {
        const response = await axios.get(`${baseUrl}/${id}/rating`)
        return { averageRating: response.data.message, type: "success" };

    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//POST Submit a rating for a program
const rateProgram = async (id, rating) =>
{
    try
    {
        const response = await axios.post(`${baseUrl}/${id}/rating`, { rating }, config)
        return { notification: response.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//PUT Update current program
const updateProgram = async (id, data) =>
{
    try
    {
        const updatedProgram = await axios.put(`${baseUrl}/${id}`, data, config)
        return { notification: updatedProgram.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//DELETE Remove current program
const removeProgram = async (id) =>
{
    try
    {
        const removedProgram = await axios.delete(`${baseUrl}/${id}`, config)
        return { notification: removedProgram.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllPrograms, createComment, getProgramRating, rateProgram, setAuthorizationToken, getProgramById, createProgram, updateProgram, removeProgram }