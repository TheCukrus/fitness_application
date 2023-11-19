import { createContext, useContext, useState, useEffect } from "react"
import cartService from "../services/cartService.js"
import { useUserContext } from "./ContextUser.js"

const ContextCart = createContext();

export const CartProvider = ({ children }) =>
{
    const { user } = useUserContext()

    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)


    const fetchCart = async () =>
    {
        try
        {
            setLoading(true)
            const fetchedCart = await cartService.getCart()
            setCart(fetchedCart)
        }
        catch (err)
        {
            console.log(err)
        }
        finally
        {
            setLoading(false)
        }
    }

    // Function to add item to cart
    const addItem = async (programId, quantity) =>
    {
        try
        {

            setLoading(true)
            const updatedCart = await cartService.addItemToCart(programId, quantity)
            console.log(updatedCart)
            fetchCart()
        }
        catch (err)
        {
            console.log(err)
        }
        finally
        {
            setLoading(false)
        }
    }

    // Function to remove item from cartGrendavė, Trakų r. sav.
    const removeItem = async (programId) =>
    {
        try
        {
            setLoading(true)
            const updatedCart = await cartService.removeItemFromCart(programId)
            console.log(updatedCart)

            fetchCart()
        }
        catch (err)
        {
            console.log(err)
        }
        finally
        {
            setLoading(false)
        }
    }

    useEffect(() => 
    {
        if (!window.localStorage.getItem("token"))
        {
            setCart(null)
            setLoading(false)
        }
        else
        {
            fetchCart();
        }
    }, [user])

    return (
        <ContextCart.Provider value={{ fetchCart, addItem, removeItem, cart, setCart, loading }}>
            {children}
        </ContextCart.Provider>
    )
}

export const useCartContext = () => useContext(ContextCart)