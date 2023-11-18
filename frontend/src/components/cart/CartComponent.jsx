import React from "react"
import { Table, Button } from "react-bootstrap"
import CartItem from "./CartItem.jsx"
import s from "../../assets/styles/CartComponent.module.css"

const CartComponent = ({ cart, finalSum, setCartRoute, setProcess }) =>
{

    const handleChekout = () =>
    {
        setCartRoute("Checkout")
        setProcess({
            shoppingCart: "completed",
            checkoutDetails: "active",
            orderComplete: "default"
        })
    }


    return (
        <div className={s.table}>
            <Table responsive>
                <thead>
                    <tr className={s.headTR}>
                        <th className={s.productHeadTH}>Product</th>
                        <th className={s.headTH}>Quantity</th>
                        <th className={s.headTH}>Price</th>
                        <th className={`d-none d-md-table-cell ${s.headTH}`}>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.cartItems.map((item) => (
                        <CartItem key={item.program.id} item={item} id={item.program.id} />
                    ))}
                    <tr className={s.lastTR}>
                        <td></td>
                        <td className="d-none d-md-table-cell"></td>
                        <td className={s.checkout}><Button onClick={handleChekout} variant="dark" className={s.checkout_btn}>Checkout</Button></td>
                        <td className={s.quantity}>€ {finalSum.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default CartComponent