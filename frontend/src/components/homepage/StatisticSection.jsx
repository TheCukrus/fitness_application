import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { FaRunning, FaTrophy, FaDumbbell, FaClock, FaAppleAlt } from "react-icons/fa"
import s from "../../assets/styles/Statistics.module.css"

const StatisticsSection = () =>
{
    return (
        <Container fluid className={s.container}>
            <Row className="my-5 py-5 justify-content-center">
                <Col md={8} className={s.sectionText}>
                    <h2>Empower Your Fitness Journey</h2>
                    <p>Discover how Train bliss has transformed lives and continues to innovate in fitness.</p>
                </Col>
            </Row>
            {/* Icons with header and paragraph */}
            <Row className="text-center justify-content-center">
                <Col md={4} className={s.statistic}>
                    <FaRunning size="3em" />
                    <h3>1,000+</h3>
                    <p>Active Members</p>
                </Col>
                <Col md={4} className={s.statistic}>
                    <FaTrophy size="3em" />
                    <h3>50+</h3>
                    <p>Success Stories</p>
                </Col>
                <Col md={4} className={s.statistic}>
                    <FaDumbbell size="3em" />
                    <h3>20+</h3>
                    <p>Workout Programs</p>
                </Col>
                <Col md={4} className={s.statistic}>
                    <FaClock size="3em" />
                    <h3>2,500+</h3>
                    <p>Total Workout Hours</p>
                </Col>
                <Col md={4} className={s.statistic}>
                    <FaAppleAlt size="3em" />
                    <h3>800+</h3>
                    <p>Nutrition Plans Created</p>
                </Col>
            </Row>
        </Container>
    )
}

export default StatisticsSection
