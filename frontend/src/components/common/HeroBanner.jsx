import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import "../../assets/styles/heroBanner.css"

const HeroBanner = ({ title, subtitle, backgroundImg }) =>
{
    return (
        <div className="hero-banner" style={{ backgroundImage: `url(${backgroundImg})` }}>
            <Container>
                <Row>
                    <Col>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HeroBanner