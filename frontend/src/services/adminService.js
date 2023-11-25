import axios from "axios"

let baseUrl

if (process.env.NODE_ENV === "development")
{
    baseUrl = "http://127.0.0.1:80/api/v1/admin"
}
else
{
    baseUrl = "https://fitness-application-faws.onrender.com/api/v1/admin"
}

const getToken = () =>
{
    const tokenFromLocalstorage = window.localStorage.getItem("token")
    return tokenFromLocalstorage ? `Bearer ${JSON.parse(tokenFromLocalstorage).token}` : null
}

const setAuthorizationToken = (token) =>
{
    config.headers.authorization = token
}

const config = {
    headers: { "authorization": getToken() }
}

//GET Admin rights access
const adminPageAccess = async () =>
{
    try
    {
        const admin = await axios.get(baseUrl, config)
        return admin.data
    }
    catch (err)
    {
        return err?.response?.data
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { adminPageAccess, setAuthorizationToken }