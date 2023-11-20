import React from "react"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaTags, FaShoppingCart } from "react-icons/fa"
import StarRating from "../common/StarRating"
import "../../assets/styles/SingleProgramCard.css"
import { useCartContext } from "../../contexts/ContextCart.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"

const SingleProgramCard = ({ program }) =>
{
    const { showToast } = useNotificationContext()
    const { addItem } = useCartContext()


    const handleAddToCart = async (programId, quantity) =>
    {
        try
        {
            if (!window.localStorage.getItem("token"))
            {
                return showToast("You need login first!", "error")
            }
            await addItem(programId, quantity)
            return showToast("Item added to cart", "success")
        }
        catch (err)
        {
            showToast("Error in adding item, please try again later", "error")
        }
    }

    const scrollToTop = () =>
    {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <Card className="h-100 program-card">
            <Card.Img variant="top" src={program.photo_path} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{program.name}</Card.Title>
                <StarRating programId={program.id} />
                <Card.Text className="text-muted">
                    {`${program.description.substring(0, 100)}...`}
                </Card.Text>
                <Card.Text className="price-text">
                    <FaTags className="me-2" />€ {program.price}
                </Card.Text>
                <div className="mt-auto">
                    <div className="program-card-footer d-flex justify-content-between align-items-center">
                        <Link to={`/programs/${program.id}`} onClick={scrollToTop}>
                            <Button variant="outline-primary">Details</Button>
                        </Link>
                        <Button variant="primary" onClick={() => { handleAddToCart(program.id, 1) }}>
                            <FaShoppingCart className="me-2" /> Add to Cart
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SingleProgramCard
