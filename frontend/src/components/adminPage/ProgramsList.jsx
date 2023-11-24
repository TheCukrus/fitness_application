import { useState, useEffect } from "react"
import programService from "../../services/programService.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"
import s from "../../assets/styles/AdminPage.module.css"
import { Table, Modal, Container } from "react-bootstrap"

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
                                <td><button onClick={() => openModal(ele)} className={s.redDeleteButton}>Delete</button></td>
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
                    <button className={s.secondaryButton} onClick={closeModal}>Cancel</button>
                    <button className={`${s.blueButton} ${s.small} `} onClick={() => deleteProgram(programToDelete?.id)}>Confirm</button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ProgramList