import { useState } from "react"
import { Form, FloatingLabel, Container, Row, Col, Button } from "react-bootstrap"

import { useCategoriesContext } from "../../contexts/ContextCategories.js"
import programService from "../../services/programService.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"

const CreateProgram = ({ fetchProgramList }) =>
{
    const { showToast } = useNotificationContext()
    const { categories } = useCategoriesContext()

    const [programForm, setProgramForm] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        whatYoullGet: "",
        url_path: "",
        photo_path: ""
    })

    const handleOnSubmit = async (e) =>
    {
        e.preventDefault()
        if (!programForm.category)
        {
            return showToast("Please choose category!", "error")
        }

        try
        {
            const program = await programService.createProgram(programForm)

            setProgramForm({
                name: "",
                category: "",
                price: "",
                description: "",
                whatYoullGet: "",
                url_path: "",
                photo_path: ""
            })
            fetchProgramList()
            showToast(program.notification, program.type)
            return
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <Container>
            <h2>Create program</h2>
            <Form onSubmit={handleOnSubmit}>
                <Form.Group>
                    <FloatingLabel label="Name" className="mb-3">
                        <Form.Control type="text" name="name" value={programForm.name} onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })} required placeholder="Enter name" />
                    </FloatingLabel>
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <FloatingLabel label="Category" className="mb-3">
                                <Form.Select name="categories" value={programForm.category} onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })} >
                                    <option value="">Select category!</option>
                                    {categories.map((ele) => (<option key={ele.title}>{ele.title}</option>))}
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <FloatingLabel label="Price" className="mb-3">
                                <Form.Control type="text" name="price" value={programForm.price} onChange={(e) => setProgramForm({ ...programForm, price: e.target.value })} required placeholder="Enter price" />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <FloatingLabel label="Photo path" className="mb-3">
                                <Form.Control type="text" name="photo_path" value={programForm.photo_path} onChange={(e) => setProgramForm({ ...programForm, photo_path: e.target.value })} required placeholder="/assets/images/programs/image name" />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <FloatingLabel label="Url path" className="mb-3">
                                <Form.Control type="text" name="url_path" value={programForm.url_path} onChange={(e) => setProgramForm({ ...programForm, url_path: e.target.value })} required placeholder="/url_paht" />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group>
                    <FloatingLabel label="Description" className="mb-3">
                        <Form.Control as="textarea" style={{ height: "150px" }} name="description" value={programForm.description} onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })} required placeholder="Small description" />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel label="What youll get" className="mb-3">
                        <Form.Control as="textarea" style={{ height: "200px" }} name="whatYoullGet" value={programForm.whatYoullGet} onChange={(e) => setProgramForm({ ...programForm, whatYoullGet: e.target.value })} required placeholder="Detailed description" />
                    </FloatingLabel>
                </Form.Group>

                <Button as="input" type="submit" />

            </Form>
        </Container >
    )
}

export default CreateProgram