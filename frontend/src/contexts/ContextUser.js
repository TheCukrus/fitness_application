import { useContext, createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import adminService from "../services/adminService.js"

const ContextUser = createContext()


export function UserProvider({ children })
{

    const [user, setUser] = useState(null)

    const [adminRights, setAdminRights] = useState(false)

    const checkAdminRights = async () =>
    {
        try
        {
            const admin = await adminService.adminPageAccess()
            setAdminRights(admin.message === "Access granted")
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const logout = () =>
    {
        window.localStorage.removeItem("token")
        setUser(null)
        setAdminRights(null)
    }

    //Checking is there is token in localstorage
    useEffect(() =>
    {
        const token = window.localStorage.getItem("token")

        if (token)
        {
            try
            {
                const decodedToken = jwt_decode(token)
                const currentTime = Date.now() / 1000

                if (decodedToken.exp < currentTime)
                {
                    window.localStorage.removeItem("token")
                    setUser(null)
                }
                else
                {
                    setUser(decodedToken)
                }

            }
            catch (err)
            {
                console.error("Error decoding token:", err)
                window.localStorage.removeItem("token")
                setUser(null)
            }
        }
    }, [])

    //Checking for admin rights
    useEffect(() =>
    {
        if (!user)
        {
            return
        }
        checkAdminRights()
    }, [user])

    return (
        <ContextUser.Provider value={{ user, setUser, adminRights, logout }} >
            {children}
        </ ContextUser.Provider>
    )
}

export function useUserContext()
{
    return useContext(ContextUser)
}