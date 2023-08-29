import { useState } from "react"
import { Link } from "react-router-dom"

import "../../assets/styles/Header.css"
import logo from "../../assets/images/logo.jpg"
import hamburger from "../../assets/images/hamburger.svg"

const Header = () =>
{
    const [showDropdown, setShowDropdown] = useState(false)

    const toggleDropdown = () => setShowDropdown(!showDropdown)
    const closeDropdown = () => setShowDropdown(false)

    return (
        <div className="Header-container">
            <div className="header-logo">
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>

            <button className={`links-toggler${showDropdown ? " show" : ""}`} onClick={toggleDropdown}>
                <img src={hamburger} alt="hamburger" />
            </button>

            <ul className={`links${showDropdown ? " show" : ""}`}>
                <li><Link to="/programs" onClick={closeDropdown}>PROGRAMS</Link></li>
                <li><Link to="/cart" onClick={closeDropdown}>CART</Link></li>
                <li><Link to="/login" onClick={closeDropdown}>LOG IN</Link></li>
                <li><Link to="/signin" onClick={closeDropdown}>SIGN UP</Link></li>
            </ul>
        </div >
    )
}

export default Header