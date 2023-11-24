import { useNavigate } from "react-router-dom"
import s from "../../assets/styles/OrderComplete.module.css"
import { BiSolidParty } from "react-icons/bi"
import { useCartContext } from "../../contexts/ContextCart.js"

const OrderComplete = ({ id }) =>
{
    const { setCart } = useCartContext()

    const navigate = useNavigate()

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
                <button onClick={() => { setCart(null); navigate("/"); }} className={s.back_to_home_btn}>Back to home page</button>
                <button onClick={() => window.print()} className={s.print_btn}>Print Receipt</button>
            </div>
        </div >
    )
}

export default OrderComplete