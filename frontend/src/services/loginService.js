import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === "development")
{
    baseUrl = "http://127.0.0.1:80/api/v1/login"
}
else
{
    baseUrl = "https://fitness-application-faws.onrender.com/api/v1/login"
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


//POST Login
const authorization = async (data) =>
{
    try
    {
        const login = await axios.post(baseUrl, data)
        return login.data
    }
    catch (err)
    {
        console.log(err)
        return { notification: err.response.data.message, type: "error" }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { authorization, setAuthorizationToken }