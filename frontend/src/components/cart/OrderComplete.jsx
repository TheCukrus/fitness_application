import { Link } from "react-router-dom"
import s from "../../assets/styles/OrderComplete.module.css"
import { BiSolidParty } from "react-icons/bi"
import { Button } from "react-bootstrap"
import { useCartContext } from "../../contexts/ContextCart.js"

const OrderComplete = ({ id }) =>
{
    const { setCart } = useCartContext()

    return (
        <div className={s.order_complete}>
            <div className={s.order_complete_header}>
                <h3>Thank you! <BiSolidParty className={s.party} /></h3>
                <h2>Order Complete!</h2>
                <p>Thank you for your purchase. Your order number is #{`${id}`}.</p>
            </div>
            <div className={s.order_complete_body}>
                <p>If you have any questions about your order, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
            </div>
            <div className={s.order_complete_actions}>
                <Button as={Link} to="/" className={`${s.button} buttonHoverEffect`} variant="dark" onClick={() => setCart(null)}>Back to home page</Button>
                <Button onClick={() => window.print()} className={`${s.button} buttonHoverEffect`} variant="success">Print Receipt</Button>
            </div>
        </div >
    )
}

export default OrderComplete