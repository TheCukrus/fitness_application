import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Form, FloatingLabel, Button } from "react-bootstrap"
import { FaGoogle, FaApple } from "react-icons/fa"
import "../../assets/styles/Login.css"
import loginService from "../../services/loginService.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"
import adminService from "../../services/adminService.js"
import categoriesServices from "../../services/categoriesServices.js"
import programService from "../../services/programService.js"
import { useUserContext } from "../../contexts/ContextUser.js"
import HeroBanner from "../common/HeroBanner.jsx"

const Login = () =>
{
    const { showToast } = useNotificationContext()
    const { user, setUser } = useUserContext()

    const [loginForm, setLoginForm] = useState({ username: "", password: "" })

    const homeNav = useNavigate()

    const handleOnSubmit = async (e) =>
    {
        e.preventDefault()
        try
        {
            const login = await loginService.authorization(loginForm)

            if (login.message)
            {
                return showToast(login.message, "error")
            }

            window.localStorage.setItem("token", JSON.stringify(login))

            adminService.setAuthorizationToken(`Bearer ${login.token}`)
            categoriesServices.setAuthorizationToken(`Bearer ${login.token}`)
            programService.setAuthorizationToken(`Bearer ${login.token}`)
            loginService.setAuthorizationToken(`Bearer ${login.token}`)

            // Check if the toast has already been shown
            if (!user)
            {
                setUser(`Bearer ${login.token}`);
                homeNav("/");
                showToast(`Welcome back ${login.username}!`, "success");
            }
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <div className="login-container">
            <div className="image-login-side">
                <HeroBanner
                    title={"Log In"}
                    subtitle={"Welcome back, start new challange or continue existing"}
                    backgroundImg="/assets/images/login.png"
                />
            </div>

            <div className="input-login-form">
                <h2>Login</h2>

                <Form onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Email/Username">
                            <Form.Control type="text" name="login" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} required placeholder="Username/Email" />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FloatingLabel label="Password">
                            <Form.Control type="password" name="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required placeholder="password" />
                        </FloatingLabel>
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Check label={"Remember me"} />
                        </Col>
                        <Col md={6} >
                            <Link className="right-aligned-link" to="/">Forgot password</Link>
                        </Col>
                    </Row>

                    <Button as="input" type="submit" className="w-100 mb-3 btn-primary"></Button>

                    <Row className="mb-3">
                        <Col xs={12} sm={6} className="pr-1">
                            <Button variant="outline-primary" className="w-100 mb-2"><FaGoogle /> Log in with Google</Button>
                        </Col>

                        <Col xs={12} sm={6} className="pl-1">
                            <Button variant="outline-primary" className="w-100 mb-2"><FaApple /> Log in with Apple</Button>
                        </Col>
                    </Row>

                    <hr className="hr-divider" />

                    <div className="account-prompt">
                        <p>No account yet? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </Form>

            </div>
        </div>
    )
}

export default Login