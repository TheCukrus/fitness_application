import { useState } from "react"
import { Link } from "react-router-dom"
import { AiOutlineMenu, AiOutlineHome } from "react-icons/ai"
import { FaShoppingCart, FaRegUserCircle, FaUsers } from "react-icons/fa"
import { RiAdminLine } from "react-icons/ri"
import { BiBookOpen } from "react-icons/bi"
import { MdAccountBox, MdOutlineLogout } from "react-icons/md"
import s from "../../assets/styles/Header.module.css"
import logo from "../../assets/images/logo.jpg"
import { useUserContext } from "../../contexts/ContextUser.js"
import { Container, Nav, Navbar, Offcanvas, NavDropdown } from "react-bootstrap"
import { useCartContext } from "../../contexts/ContextCart.js"
import { Badge } from "react-bootstrap"

const Header = () =>
{
    const { cart } = useCartContext()
    const cartLength = cart?.cartItems?.length || 0

    const { user, adminRights, logout } = useUserContext()
    const [showOffcanvas, setShowOffcanvas] = useState(false)

    const handleCloseOffcanvas = () => setShowOffcanvas(false)
    const handleToggleOffcanvas = () => setShowOffcanvas((prev) => !prev)

    return (
        <Navbar expand="sm" className="mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className={s.header_logo}>
                    <img src={logo} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggleOffcanvas} />
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            <AiOutlineMenu /> Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-between flex-grow-1 pe-3">
                            <div className="d-flex justify-content-center flex-grow-1">
                                <Nav.Link as={Link} to="/" className="mx-2" onClick={handleCloseOffcanvas}>
                                    <AiOutlineHome /> Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/programs" className="mx-2" onClick={handleCloseOffcanvas}>
                                    <BiBookOpen /> Programs
                                </Nav.Link>
                                {adminRights && (
                                    <Nav.Link as={Link} to="/admin" className="mx-2" onClick={handleCloseOffcanvas}>
                                        <RiAdminLine /> Admin Page
                                    </Nav.Link>
                                )}
                                {
                                    user && (
                                        <Nav.Link as={Link} to="/cart" className={`${s.navLink} mx-2`} onClick={handleCloseOffcanvas}>
                                            <FaShoppingCart />
                                            {cartLength > 0 && <Badge bg="success" className={s.cartBadge}>{cartLength}</Badge>}
                                            <span className={s.cartText}>Cart</span>
                                        </Nav.Link>
                                    )
                                }

                                <Nav.Link as={Link} to="/aboutus" className="mx-2" onClick={handleCloseOffcanvas}>
                                    <FaUsers /> About us
                                </Nav.Link>

                            </div>
                            <div className="d-flex align-items-center">
                                {!user ? (
                                    <>
                                        <Nav.Link as={Link} to="/login" onClick={handleCloseOffcanvas}>
                                            <button className={s.loginButton}>Log In</button>
                                        </Nav.Link>

                                        <Nav.Link as={Link} to="/signup" onClick={handleCloseOffcanvas}>
                                            <button className={s.signUpButton}>Sign Up</button>
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <NavDropdown title={<><FaRegUserCircle /> Profile</>} id="user-dropdown" align="end">
                                        <NavDropdown.Item as={Link} to={`/user/${user.id}`} onClick={handleCloseOffcanvas}>
                                            <MdAccountBox /> My account
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/" onClick={() => { logout(); handleCloseOffcanvas(); }} >
                                            <MdOutlineLogout /> Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header
