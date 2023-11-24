import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Form, FloatingLabel } from "react-bootstrap"
import { FaGoogle, FaApple } from "react-icons/fa"
import s from "../../assets/styles/Login.module.css"
import loginService from "../../services/loginService.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"
import adminService from "../../services/adminService.js"
import categoriesServices from "../../services/categoriesServices.js"
import cartService from "../../services/cartService.js"
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

            if (login.type === "error")
            {
                return showToast(login.notification, "error")
            }

            window.localStorage.setItem("token", JSON.stringify(login))

            adminService.setAuthorizationToken(`Bearer ${login.token}`)
            categoriesServices.setAuthorizationToken(`Bearer ${login.token}`)
            programService.setAuthorizationToken(`Bearer ${login.token}`)
            loginService.setAuthorizationToken(`Bearer ${login.token}`)
            cartService.setAuthorizationToken(`Bearer ${login.token}`)

            // Check if the toast has already been shown
            if (!user)
            {
                setUser(`Bearer ${login.token}`)
                homeNav("/")
                showToast(`Welcome back ${login.username}!`, "success")
            }
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <div className={s.login_container}>
            <div className={s.image_login_side}>
                <HeroBanner
                    title={"Log In"}
                    subtitle={"Welcome back, start new challange or continue existing"}
                    backgroundImg="/assets/images/login.png"
                />
            </div>

            <div className={s.input_login_form}>
                <h2>Login</h2>

                <Form onSubmit={handleOnSubmit} className={s.login_form}>
                    <Form.Group className="mb-3">
                        <FloatingLabel label={`Email/Username`}>
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
                            <Link className={s.right_aligned_link} to="/">Forgot password</Link>
                        </Col>
                    </Row>

                    <input type="submit" className={`w-100 mb-3 ${s.login_button}`} />

                    <Row className="mb-3">
                        <Col xs={12} sm={6} className="pr-1">
                            <button type="button" className={`w-100 mb-2 ${s.login_google}`}><FaGoogle /> Log in with Google</button>
                        </Col>

                        <Col xs={12} sm={6} className="pl-1">
                            <button type="button" className={`w-100 mb-2 ${s.login_apple}`}><FaApple /> Log in with Apple</button>
                        </Col>
                    </Row>

                    <hr />

                    <div className={s.account_prompt}>
                        <p>No account yet? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </Form>

            </div>
        </div>
    )
}

export default Login