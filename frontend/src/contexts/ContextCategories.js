import { createContext, useContext, useEffect, useState } from "react"
import categoriesServices from "../services/categoriesServices.js"

const ContexCategories = createContext()

export function CategoriesProvider({ children }) 
{

    const [categories, setCategories] = useState([])

    const fetchCategories = async () =>
    {
        try
        {
            const data = await categoriesServices.getAllCategories()
            return setCategories(data)
        }
        catch (err)
        {
            //There can be notification
            console.log(err)
        }
    }

    useEffect(() => { fetchCategories() }, [])

    return (
        <ContexCategories.Provider value={{ categories, fetchCategories }} >
            {children}
        </ ContexCategories.Provider>
    )
}

export function useCategoriesContext()
{
    return useContext(ContexCategories)
}