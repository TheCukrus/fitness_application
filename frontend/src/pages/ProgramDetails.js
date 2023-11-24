import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import programService from "../services/programService.js"
import { Container, FloatingLabel, Placeholder, Form, Breadcrumb, Tab, Tabs, Row, Col, Image, Badge, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import StarRating from "../components/common/StarRating.jsx"
import { AiOutlineHome } from "react-icons/ai"
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa"
import s from "../assets/styles/ProgramDetails.module.css"
import { useNotificationContext } from "../contexts/ContextNotification.js"
import FeaturedPrograms from "../components/programs/FeaturedPrograms.jsx"
import { useCartContext } from "../contexts/ContextCart.js"

const ProgramDetails = () =>
{
    const { addItem } = useCartContext()

    const programId = useParams()
    const { showToast } = useNotificationContext()

    const [comment, setComment] = useState("")
    const [program, setProgram] = useState({})
    const [loading, setLoading] = useState(true)

    const [isFavorite, setIsFavorite] = useState(false)

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

    const fetchProgram = async () =>
    {
        try
        {
            const fetchProgram = await programService.getProgramById(programId.id)
            setProgram(fetchProgram)
        }
        catch (err)
        {
            console.log(err)
        }
        finally
        {
            setLoading(false)
        }
    }

    const handleComment = async (e) =>
    {
        e.preventDefault()

        if (!comment.trim)
        {
            return showToast("You can't leave empty comment!", "error")
        }

        try
        {
            const sendComment = await programService.createComment(programId.id, { comment })

            if (sendComment.type === "error")
            {
                showToast(sendComment.notification, "error")
            }

            console.log(sendComment)
            setComment("")
            fetchProgram()
        }
        catch (err)
        {
            console.log(err)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchProgram(); }, [program.id, programId])

    return (
        <Container className="mt-5">

            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}><AiOutlineHome /></Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/programs" }}>Programs</Breadcrumb.Item>
                <Breadcrumb.Item active>Program Details</Breadcrumb.Item>
            </Breadcrumb>

            {loading ? (
                <>
                    <Row className={s.mainContent}>
                        <Col lg={5} md={7} sm={12}>
                            <Placeholder as={Image} animation="glow" src="holder.js/100px250" fluid />
                        </Col>
                        <Col lg={7} md={5} sm={12}>
                            <Placeholder as="h2" animation="glow">
                                <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder as="p" animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder.Button variant="primary" xs={6} />
                            <Placeholder.Button variant="secondary" xs={6} />
                        </Col>
                    </Row>
                </>
            ) : (
                <>
                    <Row className={s.main_content}>
                        <Col lg={5} md={7} sm={12} >
                            <Image src={program.photo_path} fluid thumbnail />
                        </Col>
                        <Col lg={7} md={5} sm={12}  >
                            <div className={s.main_content_side}>
                                <h2 className={s.h2}>{program.name}</h2>
                                <StarRating programId={programId.id} />
                                <Badge bg="secondary" className={s.category}>{program.category}</Badge>
                                <h3 className={s.price}>{program.price} €</h3>
                                <p className={s.description}>{program.description}</p>
                                <hr />

                                <div className={s.action}>
                                    <button className={`${s.add_to_cart} me-2`} onClick={() => { handleAddToCart(programId.id, 1) }}><FaShoppingCart /> Add to Cart</button>
                                    <Button
                                        className={`${s.favorite_button} ${isFavorite ? s.favored : ''}`}
                                        variant="link"
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                        <span className={s.heart_icon}>
                                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Tabs defaultActiveKey={"description"} className="mb-3" >
                        <Tab eventKey="description" title="Addicional Information">
                            <Card>
                                <Card.Header as="h4">Additional Information</Card.Header>
                                <ListGroup variant="flush">
                                    {program.whatYoullGet && program.whatYoullGet.map((ele, index) => (
                                        <ListGroupItem key={index}>
                                            <strong>{ele.name}</strong>
                                            <p>{ele.text}</p>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </Card>
                        </Tab>
                        <Tab eventKey="Reviews" title={`Reviews (${program?.comments.length})`}>
                            <Card>
                                <Card.Header as="h4">Reviews ({program?.comments.length})</Card.Header>
                                <ListGroup variant="flush">
                                    {program?.comments.map((comment, index) => (
                                        <ListGroupItem key={index}>
                                            <strong>{comment.username}</strong>
                                            <p>{comment.comment}</p>
                                            <small className="text-muted">{comment.date}</small>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                                <Card.Body>
                                    <Form onSubmit={handleComment}>
                                        <FloatingLabel label="Leave a comment" className="mb-3">
                                            <Form.Control
                                                as="textarea"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Write your thoughts"
                                            />
                                        </FloatingLabel>
                                        <button type="submit" className={s.comment_btn}>Submit Comment</button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>

                    <FeaturedPrograms />
                </>
            )}
        </Container>)
}

export default ProgramDetails