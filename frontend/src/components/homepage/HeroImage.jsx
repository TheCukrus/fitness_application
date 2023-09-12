import React from "react"

import "../../assets/styles/HeroImage.css"
import heroImage from "../../assets/images/hero_image.jpg"

const HeroImage = () =>
{
    return (
        <div className="hero-section">
            <div className="hero-text">
                <h1>Transform Your Lifestyle</h1>
                <p>Start Your Journey to a Healthier You</p>
                <button className="hero-image-btn">Explore</button>
            </div>
            <img src={heroImage} alt="hero_image" className="hero-image" />
            <div className="hero-overlay"></div>
        </div>
    )
}

export default HeroImage

/*
"Discover Fitness Programs That Work"
"Unlock Your Full Potential with Our Programs"
"Embrace Wellness and Achieve Your Goals"
"Join Our Community of Fitness Enthusiasts"
"Fuel Your Body, Energize Your Mind"
*/