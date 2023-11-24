import { useState } from "react"
import { Col, Row, Form, FloatingLabel } from "react-bootstrap"
import userService from "../../services/userService.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"
import HeroBanner from "../common/HeroBanner.jsx"
import { FaGoogle, FaApple } from "react-icons/fa"
import { Link } from "react-router-dom"
import s from "../../assets/styles/Signup.module.css"

const SignUp = () =>
{
    const { showToast } = useNotificationContext()

    const [userForm, setUserForm] = useState({
        username: "",
        email: "",
        name: "",
        password: ""
    })

    const handleOnSubmit = async (e) =>
    {
        e.preventDefault()
        try
        {
            const newUser = await userService.createNewUser(userForm)
            console.log(newUser)
            showToast(newUser.notification, newUser.type)

            setUserForm({
                username: "",
                email: "",
                name: "",
                password: ""
            })
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <div className={s.container}>
            <div className={s.image_signup_side}>
                <HeroBanner
                    title={"Sign Up"}
                    subtitle={"Create account and start your journey to better tommorow"}
                    backgroundImg="/assets/images/signup.png"
                />
            </div>
            <div className={s.input_form}>
                <h2>Sign up</h2>
                <Form onSubmit={handleOnSubmit}>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <FloatingLabel label="Username">
                                    <Form.Control type="text" name="username" value={userForm.username} onChange={(e) => setUserForm({ ...userForm, username: e.target.value })} required minLength={3} placeholder="Username" />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3">
                                <FloatingLabel label="Name">
                                    <Form.Control type="text" name="name" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} placeholder="Name" />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <FloatingLabel label="Email">
                            <Form.Control type="email" name="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} required placeholder="Email" />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FloatingLabel label="Password">
                            <Form.Control type="password" name="password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} required minLength={8} placeholder="Password" />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check label="Accept rules of this website" required />
                    </Form.Group>

                    <input type="submit" className={`w-100 mb-3 ${s.signUpButton} `} />

                    <Row className="mb-3">
                        <Col xs={12} sm={6} className="pr-1">
                            <button type="button" className={`w-100 mb-2 ${s.signUp_google}`}><FaGoogle /> Log in with Google</button>
                        </Col>
                        <Col xs={12} sm={6} className="pl-1">
                            <button type="button" className={`w-100 mb-2 ${s.signUp_apple}`} > <FaApple /> Log in with Apple</button>
                        </Col>
                    </Row>

                    <hr />

                    <div className={s.account_prompt}>
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </Form>
            </div>

        </div >
    )
}

export default SignUp