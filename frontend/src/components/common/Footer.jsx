import React from "react"
import { FaYoutube, FaFacebook, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"


import "../../assets/styles/Footer.css"

const Footer = () =>
{
    return (
        <footer className="Footer-container" >
            <div className="footer-text">
                <p>&copy; {new Date().getFullYear()} Train Bliss</p>
            </div>
            <div className="footer-icons">
                <a href="https:youtube.com"><FaYoutube className="footer-current-icon" /></a>
                <a href="https:facebook.com"><FaFacebook className="footer-current-icon" /></a>
                <a href="https:twitter.com"><FaTwitter className="footer-current-icon" /></a>
                <a href="https:linkedIn.com"><FaLinkedinIn className="footer-current-icon" /></a>
                <a href="https:instagram.com"><FaInstagram className="footer-current-icon" /></a>
            </div>
        </footer>
    )
}

export default Footer