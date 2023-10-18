import { createContext, useContext, useState } from "react"

const ContextNotification = createContext()

export function NotificationProvider({ children })
{

    const [notification, setNotification] = useState(null)

    const showToast = (message, type, duration = 5000) =>
    {
        setNotification({ message, type })

        setTimeout(() =>
        {
            return setNotification(null)
        }, duration)
    }

    return (
        <ContextNotification.Provider value={{ notification, showToast }}>
            {children}
        </ContextNotification.Provider>
    )
}


export function useNotificationContext()
{
    return useContext(ContextNotification)
}