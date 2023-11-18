import axios from "axios"

const baseUrl = "http://127.0.0.1:80/api/v1/categories"

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

//Config file
const config = {
    headers: {
        "authorization": getToken()
    }
}

//GET All categories
const getAllCategories = async () =>
{
    try
    {
        const categories = await axios.get(baseUrl)
        return categories.data.message
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//POST Create new category
const createCategory = async (data) =>
{
    try
    {
        const newCategory = await axios.post(baseUrl, data, config)
        return { notification: newCategory.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

//DELETE Category from database
const removeCategory = async (id) =>
{
    try
    {
        const category = await axios.delete(`${baseUrl}/${id}`, config)
        return { notification: category.data.message, type: "success" }
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllCategories, setAuthorizationToken, createCategory, removeCategory }