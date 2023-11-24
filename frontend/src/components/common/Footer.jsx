import React from "react"
import { FaYoutube, FaFacebook, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"

import s from "../../assets/styles/Footer.module.css"

const Footer = () =>
{
    return (
        <footer className={s.Footer_container} >
            <div className={s.footer_text}>
                <p>&copy; {new Date().getFullYear()} Train Bliss</p>
            </div>
            <div className={s.footer_icons}>
                <a href="https:youtube.com"><FaYoutube className={s.footer_current_icon} /></a>
                <a href="https:facebook.com"><FaFacebook className={s.footer_current_icon} /></a>
                <a href="https:twitter.com"><FaTwitter className={s.footer_current_icon} /></a>
                <a href="https:linkedIn.com"><FaLinkedinIn className={s.footer_current_icon} /></a>
                <a href="https:instagram.com"><FaInstagram className={s.footer_current_icon} /></a>
            </div>
        </footer>
    )
}

export default Footer