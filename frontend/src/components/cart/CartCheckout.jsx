import { useState } from "react"
import { Container, Form, FloatingLabel, Row, Col } from "react-bootstrap"
import s from "../../assets/styles/CartCheckout.module.css"
import cartService from "../../services/cartService.js"

const CartCheckout = ({ cartId, setCartRoute, setProcess }) =>
{
    const [contactInfo, setContactInfo] = useState({
        name: "",
        lastName: "",
        phoneNumber: "",
        email: ""
    })

    const [payment, setPayment] = useState({
        paymentMethod: "",
        cardNumber: "",
        expirationDate: "",
        cvc: ""
    })

    const handlePlaceOrder = async () =>
    {
        try
        {
            await cartService.removeCart(cartId)

            setCartRoute("PlaceOrder")
            setProcess({
                shoppingCart: "completed",
                checkoutDetails: "completed",
                orderComplete: "active"
            })
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <Container>
            <div className={s.contactInfo}>
                <h2>Contact Information</h2>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <FloatingLabel label="Name">
                                    <Form.Control className="mb-3" type="text" value={contactInfo.name} onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })} placeholder="name" />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <FloatingLabel label="LastName">
                                    <Form.Control className="mb-3" type="text" value={contactInfo.lastName} onChange={(e) => setContactInfo({ ...contactInfo, lastName: e.target.value })} placeholder="lastname" />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <FloatingLabel label="Phone Number">
                            <Form.Control className="mb-3" type="phone" value={contactInfo.phoneNumber} onChange={(e) => setContactInfo({ ...contactInfo, phoneNumber: e.target.value })} placeholder="phonenumber" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel label="Your Email">
                            <Form.Control className="mb-3" type="email" value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} placeholder="email" required />
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            </div>

            <div className={s.paymentInfo}>
                <h2>Payment Method</h2>

                <Form>
                    <Form.Group>
                        <Form.Check type="radio" className="mb-3" label="Pay by Card Credit" value="card" name="paymentMethod" onChange={(e) => setPayment({ ...payment, paymentMethod: e.target.checked })} />
                        <Form.Check type="radio" className="mb-3" label="Paypal" value="paypal" name="paymentMethod" onChange={(e) => setPayment({ ...payment, paymentMethod: e.target.checked })} />
                    </Form.Group>
                    <hr />
                    <Form.Group>
                        <FloatingLabel label="Card Number">
                            <Form.Control type="number" className="mb-3" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} placeholder="card number" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <FloatingLabel label="Expiration Date">
                                    <Form.Control className="mb-3" value={payment.expirationDate} onChange={(e) => setPayment({ ...payment, expirationDate: e.target.value })} placeholder="Expiration Date" required />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <FloatingLabel label="CVC code">
                                    <Form.Control className="mb-3" type="text" value={payment.cvc} onChange={(e) => setPayment({ ...payment, cvc: e.target.value })} placeholder="CVC" required />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>
            </div>

            <div className={s.button}>
                <button className={s.placeOrder} onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </Container>
    )
}

export default CartCheckout