import { useState } from "react"
import { Form, FloatingLabel, Container, Row, Col, Button, Stack } from "react-bootstrap"

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
        whatYoullGet: [{ name: "", text: "" }],
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
                whatYoullGet: [],
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




    //Add description field
    const addField = (e) =>
    {
        e.preventDefault()
        const newField = [{ name: "", text: "" }]
        const addedField = programForm.whatYoullGet
        return setProgramForm({ ...programForm, whatYoullGet: addedField.concat(newField) })
    }

    //Remove last description field
    const removeField = (e) =>
    {
        e.preventDefault(e)
        const whatYoullGetArr = programForm.whatYoullGet
        whatYoullGetArr.pop()
        return setProgramForm({ ...programForm, whatYoullGet: whatYoullGetArr })
    }

    return (
        <Container>
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

                <Form.Group>
                    <FloatingLabel label="Photo path" className="mb-3">
                        <Form.Control type="text" name="photo_path" value={programForm.photo_path} onChange={(e) => setProgramForm({ ...programForm, photo_path: e.target.value })} required placeholder="/assets/images/programs/image name" />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel label="Description" className="mb-3">
                        <Form.Control as="textarea" style={{ height: "150px" }} name="description" value={programForm.description} onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })} required placeholder="Small description" />
                    </FloatingLabel>
                </Form.Group>



                {programForm.whatYoullGet.map((ele, i) =>
                (
                    <Form.Group key={`whatYoullGet arr index ${i}`}>
                        <h3 className="mb-3 text-center">{`Detail description field ${i + 1}`}</h3>
                        <FloatingLabel label="Description name field" className="mb-3">
                            <Form.Control
                                type="text"
                                name="whatYoullGetName"
                                value={ele.name}
                                onChange={(e) =>
                                {
                                    const newField = [...programForm.whatYoullGet]
                                    newField[i].name = e.target.value
                                    setProgramForm({ ...programForm, whatYoullGet: newField })
                                }}
                                placeholder="name"
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Description text field" className="mb-3">
                            <Form.Control
                                as="textarea"
                                style={{ height: "100px" }}
                                name="whatYoullGetText"
                                value={ele.text}
                                onChange={(e) =>
                                {
                                    const newField = [...programForm.whatYoullGet]
                                    newField[i].text = e.target.value
                                    setProgramForm({ ...programForm, whatYoullGet: newField })
                                }}
                                placeholder="detailed description"
                            />
                        </FloatingLabel>
                    </Form.Group>
                ))}
                <Stack direction="horizontal" gap={3}>
                    <Button className="mb-3" variant="success" onClick={addField}>Add field</Button>
                    <Button className="mb-3" variant="danger" onClick={removeField}>Remove field</Button>
                </Stack>

                <Button as="input" type="submit" />

            </Form>
        </Container >
    )
}

export default CreateProgram