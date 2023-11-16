import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import "../../assets/styles/heroBanner.css"

const HeroBanner = ({ title, subtitle, backgroundImg }) =>
{
    return (
        <div className="hero-banner" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})` }}>
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-animation">{title}</h1>
                        <p className="text-animation">{subtitle}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HeroBanner