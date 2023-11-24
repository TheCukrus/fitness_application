import { useState } from "react"
import { useCartContext } from "../contexts/ContextCart.js"
import { Container, Row, Col } from "react-bootstrap"
import s from "../assets/styles/Cart.module.css"
import CartProcess from "../components/cart/CartProcess.jsx"
import CartComponent from "../components/cart/CartComponent.jsx"
import CartCheckout from "../components/cart/CartCheckout.jsx"
import OrderComplete from "../components/cart/OrderComplete.jsx"
import { useNavigate } from "react-router-dom"

const Cart = () =>
{
    const { cart } = useCartContext()

    const [process, setProcess] = useState({
        shoppingCart: "active",
        checkoutDetails: "default",
        orderComplete: "default"
    })

    const navigate = useNavigate()

    const [cartRoute, setCartRoute] = useState("shoppingCart")

    const finalSum = cart?.cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.program.price), 0)

    return (
        <Container className={s.cartContainer}>
            {!cart || cart.cartItems.length === 0 ? (
                <Container className={s.emptyCartContainer}>
                    <Row>
                        <Col className={s.emptyCart}>
                            <h2 className={s.emptyCartTitle}>Your cart feels lonely</h2>
                            <p className={s.emptyCartText}>Looks like you haven't made your choice yet...</p>
                            <button className={s.shoppingButton} onClick={() => { navigate("/programs") }}>Start Exploring Programs</button>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container>
                    <h1 className={s.cartTitle}>{cartRoute === "shoppingCart" ? "Cart" : cartRoute === "Checkout" ? "Check Out" : "Complete!"}</h1>

                    {/* Shows cart process */}
                    <CartProcess process={process} />

                    {
                        cartRoute === "shoppingCart"
                            ?
                            <CartComponent finalSum={finalSum} cart={cart} setCartRoute={setCartRoute} setProcess={setProcess} />
                            :
                            cartRoute === "Checkout"
                                ?
                                <CartCheckout cartId={cart.id} setCartRoute={setCartRoute} setProcess={setProcess} />
                                :
                                <OrderComplete id={cart.id} />
                    }
                </Container>
            )}
        </Container>
    )
}

export default Cart
