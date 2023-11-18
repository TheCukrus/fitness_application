import React from "react"
import { Image, Button } from "react-bootstrap"
import { AiOutlineClose } from "react-icons/ai"
import s from "../../assets/styles/CartItem.module.css"

const CartItem = ({ item }) =>
{
    return (
        <tr>
            <td className={s.productDetail}>
                <Image src={item.program.photo_path} className={s.productImage} alt={item.program.name} />
                <div className={s.productInfo}>
                    <strong>{item.program.name}</strong>
                    <p>{item.program.category}</p>
                    <Button variant="link" size="sm" className={s.removeButton}><AiOutlineClose /> Remove</Button>
                </div>
            </td>
            <td className={s.quantity}>
                <span className={s.quantity}>{item.quantity}</span>
            </td>
            <td className={s.price}>€ {item.program.price}</td>
            <td className={`d-none d-md-table-cell ${s.subtotal}`}>€ {(parseFloat(item.program.price) * item.quantity).toFixed(2)}</td>
        </tr>

    )
}

export default CartItem