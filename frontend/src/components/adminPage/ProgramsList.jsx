import { useState, useEffect } from "react"
import programService from "../../services/programService.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"

import { Table, Button, Modal, Container } from "react-bootstrap"

const ProgramList = ({ fetchProgramList, programList }) =>
{
    const { showToast } = useNotificationContext()

    const [show, setShow] = useState(false)
    const [programToDelete, setProgramToDelete] = useState(null)

    const openModal = (program) =>
    {
        setProgramToDelete(program)
        setShow(true)
    }

    const closeModal = () => setShow(false)

    const deleteProgram = async (id) =>
    {
        try
        {
            const removeProgram = await programService.removeProgram(id)

            showToast(removeProgram.notification, removeProgram.type)
            closeModal()
            fetchProgramList()
        }
        catch (err)
        {
            console.log(err)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchProgramList() }, [])

    return (
        <Container>

            {
                !programList
                    ? <h2>Loading</h2>
                    //We would modify this loading
                    : <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price €</th>
                                <th>Photo path</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programList.map((ele) =>
                            (<tr key={ele.id}>
                                <td>{ele.name}</td>
                                <td>{ele.category}</td>
                                <td>{ele.price}</td>
                                <td>{ele.photo_path}</td>
                                <td><Button variant="danger" onClick={() => openModal(ele)}>Delete</Button></td>
                            </tr>))}
                        </tbody>
                    </Table>
            }

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Program</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to delete {programToDelete?.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="primary" onClick={() => deleteProgram(programToDelete?.id)}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ProgramList