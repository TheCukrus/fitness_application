import React from "react"
import HeroBanner from "../common/HeroBanner.jsx"
import { Row, Col, Container } from "react-bootstrap"
import s from "../../assets/styles/HeroSection.module.css"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../contexts/ContextUser.js"

const HeroSection = () =>
{
    const navigate = useNavigate()
    const { user } = useUserContext()

    const handleNavigate = () =>
    {
        if (user)
        {
            return navigate("/programs")
        }
        else
        {
            return navigate("/login")
        }
    }

    return (
        <Container fluid className={s.container}>
            <Row>
                <Col md={6} className={s.text_column}>
                    <h1>Transform Your Life with Every Rep</h1>
                    <p>Step into a world where fitness and lifestyle converge for the ultimate transformation. At Train Bliss, we believe in empowering you to surpass your limits, reach new heights in your personal health journey, and connect with a community that inspires. With expert trainers, cutting-edge programs, and a supportive environment, ignite your passion for wellness and watch as your body, mind, and spirit evolve. It's not just about lifting weights—it's about uplifting lives.</p>

                    <button className={s.primaryAction} onClick={handleNavigate}>Get Started</button>
                    <button className={s.secondaryAction} onClick={() => navigate("/aboutus")}>Learn More</button>
                </Col>
                <Col md={6}>
                    <HeroBanner backgroundImg="/assets/images/hero_image.png" />
                </Col>
            </Row>
        </Container>
    )
}

export default HeroSection
