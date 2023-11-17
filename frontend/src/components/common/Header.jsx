import React from "react"
import { Link } from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai"
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa"
import { RiAdminLine } from "react-icons/ri"
import { BiBookOpen } from "react-icons/bi"
import { MdAccountBox, MdOutlineLogout } from "react-icons/md"
import "../../assets/styles/Header.css"
import logo from "../../assets/images/logo.jpg"
import { useUserContext } from "../../contexts/ContextUser.js"
import { Button, Container, Nav, Navbar, Offcanvas, NavDropdown } from "react-bootstrap"

const Header = () =>
{
    const { user, adminRights, logout } = useUserContext()

    return (
        <Navbar expand="sm" className="mb-3">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="header-logo">
                    <img src={logo} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            <AiOutlineMenu /> Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-between flex-grow-1 pe-3">
                            <div className="d-flex justify-content-center flex-grow-1">
                                <Nav.Link as={Link} to="/programs" className="mx-2">
                                    <BiBookOpen /> Programs
                                </Nav.Link>
                                {adminRights && (
                                    <Nav.Link as={Link} to="/admin" className="mx-2">
                                        <RiAdminLine /> Admin Page
                                    </Nav.Link>
                                )}
                                {user && (
                                    <Nav.Link as={Link} to="/cart" className="mx-2">
                                        <FaShoppingCart /> Cart
                                    </Nav.Link>
                                )}
                            </div>
                            <div className="d-flex align-items-center">
                                {!user ? (
                                    <>
                                        <Nav.Link as={Link} to="/signup">
                                            <Button size="sm" variant="outline-primary">
                                                Sign Up
                                            </Button>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/login">
                                            <Button size="sm" variant="primary">
                                                Log In
                                            </Button>
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <NavDropdown title={<><FaRegUserCircle /> Profile</>} id="user-dropdown" align="end">
                                        <NavDropdown.Item as={Link} to={`/user/${user.id}`}>
                                            <MdAccountBox /> My account
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/" onClick={logout}>
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
