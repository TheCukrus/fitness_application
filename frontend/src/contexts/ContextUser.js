import { useContext, createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode"

const ContextUser = createContext()


export function UserProvider({ children })
{

    const [user, setUser] = useState(null)

    //Checking is there is token in localstorage
    useEffect(() =>
    {
        const token = window.localStorage.getItem("token")
        if (token)
        {
            const decodedToken = jwt_decode(token)
            const expirationTime = decodedToken.exp * 1000

            if (expirationTime < Date.now())
            {
                window.localStorage.removeItem("token")
                setUser(null)
            }
            else
            {
                setUser(token)
            }
        }
    }, [])

    return (
        <ContextUser.Provider value={{ user, setUser }} >
            {children}
        </ ContextUser.Provider>
    )
}

export function useUserContext()
{
    return useContext(ContextUser)
}