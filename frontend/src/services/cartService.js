import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === "development")
{
    baseUrl = "http://127.0.0.1:80/api/v1/cart"
}
else
{
    baseUrl = "https://fitness-application-faws.onrender.com/api/v1/cart"
}

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


// Fetch the current user's cart
const getCart = async () =>
{
    try
    {
        const response = await axios.get(baseUrl, config)
        return response.data.message
    } catch (err)
    {
        return console.log("Cart is empty!")
    }
}

// Add an item to the cart
const addItemToCart = async (programId, quantity) =>
{
    try
    {
        const response = await axios.post(`${baseUrl}/add`, { programId, quantity }, config)
        return response.data.message
    } catch (err)
    {
        console.error('Error adding item to cart:', err.response?.data?.message || err.message)
        throw err
    }
}

// Remove an item from the cart
const removeItemFromCart = async (programId) =>
{
    try
    {
        const response = await axios.delete(`${baseUrl}/remove/${programId}`, config)
        return response.data.message
    } catch (error)
    {
        console.error('Error removing item from cart:', error.response?.data?.message || error.message)
        throw error
    }
}

// Remove Cart
const removeCart = async (cartId) =>
{
    try
    {
        const response = await axios.delete(`${baseUrl}/cart/remove/${cartId}`, config)
        return response.data.message
    }
    catch (error)
    {
        console.error('Error removing cart:', error.response?.data?.message || error.message)
        throw error
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCart, removeCart, addItemToCart, removeItemFromCart, setAuthorizationToken }