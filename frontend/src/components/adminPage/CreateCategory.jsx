import { useState } from "react"
import { useCategoriesContext } from "../../contexts/ContextCategories.js"
import categoriesServices from "../../services/categoriesServices.js"
import { Container, Form, FloatingLabel } from "react-bootstrap"
import { useNotificationContext } from "../../contexts/ContextNotification.js"
import s from "../../assets/styles/AdminPage.module.css"

const CreateCategory = () =>
{
    const { fetchCategories } = useCategoriesContext()
    const { showToast } = useNotificationContext()

    const [categoriesForm, setCategoriesForm] = useState({
        title: "",
        description: "",
        urlPath: "",
        imagePath: ""
    })

    const handleOnSubmit = async (e) =>
    {
        e.preventDefault()
        try
        {
            const newCategory = await categoriesServices.createCategory(categoriesForm)
            setCategoriesForm({ title: "", description: "", urlPath: "", imagePath: "" })
            fetchCategories()
            return showToast(newCategory.notification, newCategory.type)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <Container className={s.container}>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <FloatingLabel label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Name" value={categoriesForm.title} onChange={(e) => setCategoriesForm({ ...categoriesForm, title: e.target.value })} required />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel label="Description" className="mb-3">
                        <Form.Control type="text" placeholder="Description" value={categoriesForm.description} required onChange={(e) => setCategoriesForm({ ...categoriesForm, description: e.target.value })} />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel label="Url path" className="mb-3">
                        <Form.Control type="text" placeholder="/categories/path name" value={categoriesForm.urlPath} required onChange={(e) => setCategoriesForm({ ...categoriesForm, urlPath: e.target.value })} />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel label="Image path" className="mb-3">
                        <Form.Control type="text" placeholder="/assets/images/image name" value={categoriesForm.imagePath} onChange={(e) => setCategoriesForm({ ...categoriesForm, imagePath: e.target.value })} />
                    </FloatingLabel>
                </Form.Group>
                <input className={s.blueButton} type="submit" />
            </Form>
        </Container>
    )
}

export default CreateCategory