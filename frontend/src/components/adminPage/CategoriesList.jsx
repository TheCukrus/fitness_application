import { useCategoriesContext } from "../../contexts/ContextCategories.js"
import categoriesServices from "../../services/categoriesServices.js"
import { Table } from "react-bootstrap"

const CategoriesList = () =>
{
    const { fetchCategories, categories } = useCategoriesContext()

    const removeCategory = async (id) =>
    {
        try
        {
            const data = await categoriesServices.removeCategory(id)
            fetchCategories()
            //There we can return notification
            return data
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <div>
            <h2>Categories List</h2>

            {categories.length === 0
                ? <h2>Loading</h2>
                :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Url path</th>
                            <th>Image path</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((ele) => (
                            <tr key={ele.id}>
                                <td>{ele.title}</td>
                                <td>{ele.description}</td>
                                <td>{ele.urlPath}</td>
                                <td>{ele.imagePath}</td>
                                <td><button onClick={() => (removeCategory(ele.id))}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default CategoriesList