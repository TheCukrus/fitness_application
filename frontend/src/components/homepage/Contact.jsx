import { useState } from "react"
import s from "../../assets/styles/Contact.module.css"
import { Container, Form, Col, Row, Image } from "react-bootstrap"
import { useInView } from "react-intersection-observer"

const Contact = () =>
{
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5
    })

    const [status, setStatus] = useState(false)
    const [messageForm, setMessageForm] = useState({
        name: "",
        lastName: "",
        email: "",
        message: ""
    })

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        console.log("Message send")
        setStatus(true)
    }

    return (
        <Container fluid className={s.container} >
            <Row ref={ref}>
                <Col md={6} sm={12} className={`${s.image} ${inView ? s.fadeInUp : ""}`}>
                    <Image fluid src="/assets/images/contactUs.png" alt="contactUs" />
                </Col>

                <Col md={6} sm={12} className={s.form_side}>
                    {!status
                        ?
                        (<Form>
                            <h2 className={`${s.header} ${inView ? s.headerAnimation : ""}`}>Get In Touch</h2>
                            <p className={`${s.paragraph} ${inView ? s.paragraphAnimation : ""}`}>If you have any questions, or propositions feel free to leave a message</p>

                            <Row className={`${s.formName} ${inView ? s.FormNameAnimation : ""}`}>
                                <Col sm={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={messageForm.name} onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })} placeholder="John" required />
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={messageForm.lastName} onChange={(e) => setMessageForm({ ...messageForm, lastName: e.target.value })} placeholder="Doe" required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className={`${"mb-3"} ${s.formEmail} ${inView ? s.FormEmailAnimation : ""}`}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={messageForm.email} onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })} placeholder="example@example.com" required />
                            </Form.Group>

                            <Form.Group className={`${"mb-3"} ${s.formMessage} ${inView ? s.FormMessageAnimation : ""}`}>
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" style={{ height: "150px" }} value={messageForm.message} onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })} placeholder="..." required />
                            </Form.Group>

                            <div className={`${s.buttonPlace} ${inView ? s.ButtonAnimation : ""}`}>
                                <button onClick={handleSubmit} className={s.button} type="submit">Send Message</button>
                            </div>
                        </Form>)
                        : (
                            <div className={`${s.thankYouMessage} ${inView ? s.thankYouAnimation : ""}`}>
                                <h2>Thank You!</h2>
                                <p>Your message has been sent successfully. We will get back to you soon!</p>
                            </div>
                        )}
                </Col>
            </Row>
        </Container>
    )
}

export default Contact