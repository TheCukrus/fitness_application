import axios from "axios"

const baseUrl = "http://127.0.0.1:80/api/v1/user"

//GET All users
const getAllUsers = async () =>
{
    try
    {
        const users = await axios.get(baseUrl)
        return { notification: users.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//GET User by Id
const getUserById = async (id) =>
{
    try
    {
        const user = await axios.get(`${baseUrl}/${id}`)
        return { notification: user.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//POST Create new user
const createNewUser = async (data) =>
{
    try
    {
        const newUser = await axios.post(baseUrl, data)
        return { notification: newUser.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllUsers, getUserById, createNewUser }