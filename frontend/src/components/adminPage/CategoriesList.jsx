import { useCategoriesContext } from "../../contexts/ContextCategories.js"
import categoriesServices from "../../services/categoriesServices.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"

import { useState } from "react"
import { Table, Container, Button, Modal } from "react-bootstrap"


const CategoriesList = () =>
{
    const { showToast } = useNotificationContext()
    const { fetchCategories, categories } = useCategoriesContext()

    const [show, setShow] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState(null)

    const openModal = (category) =>
    {
        setCategoryToDelete(category)
        setShow(true)
    }

    const closeModal = () => setShow(false)

    const removeCategory = async (id) =>
    {
        try
        {
            const data = await categoriesServices.removeCategory(id)
            fetchCategories()
            closeModal()
            return showToast(data.notification, data.type)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <Container>
            <h2>Categories List</h2>

            {categories.length === 0
                ? <h2>Loading</h2>
                :
                <Table striped bordered hover responsive>
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
                                <td><Button variant="danger" onClick={() => { openModal(ele) }}>Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to delete {categoryToDelete?.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="primary" onClick={() => removeCategory(categoryToDelete?.id)}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default CategoriesList