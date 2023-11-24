import React from "react"
import s from "../../assets/styles/FeaturesSection.module.css"
import { Row, Col } from "react-bootstrap"
import { GiMuscleUp, GiMeal, GiYinYang } from "react-icons/gi"
import { useInView } from 'react-intersection-observer'
import { useNavigate } from "react-router-dom"

const Feature = ({ icon: Icon, title, description }) =>
{
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const animationClass = inView ? s.animate : ""

    return (
        /* Icon with name and description */
        <Col md={4} className={`${s.feature} ${animationClass}`} ref={ref}>
            <Icon size="3em" className={s.featureIcon} />
            <h3 className={s.featureTitle}>{title}</h3>
            <p className={s.featureDescription}>{description}</p>
        </Col>
    )
}

const FeaturesSection = () =>
{

    const navigate = useNavigate()


    return (
        <section className={s.featuresContainer}>
            <Row className="justify-content-center text-center mb-4">
                <Col lg={8}>
                    <h2 className={s.featuresHeading}>Why Choose Train Bliss?</h2>
                    <p className={s.featuresIntro}>
                        Each of our fitness programs is designed to support, challenge, and inspire you towards your fitness goals.
                    </p>
                </Col>
            </Row>
            <Row>
                <Feature
                    icon={GiMuscleUp}
                    title="Strength Training"
                    description="Build muscle and power through a variety of resistance workouts tailored to all fitness levels."
                />
                <Feature
                    icon={GiMeal}
                    title="Nutrition Guidance"
                    description="Get personalized meal plans created by nutrition experts to fuel your fitness journey."
                />
                <Feature
                    icon={GiYinYang}
                    title="Mind & Body"
                    description="Engage in yoga and mindfulness sessions to achieve a balanced approach to health and well-being."
                />
            </Row>
            <Row className="mt-4 justify-content-center">
                <Col className="text-center">
                    <button onClick={() => navigate("/programs")} className={s.primaryAction}>Explore Programs</button>
                </Col>
            </Row>
        </section>
    )
}

export default FeaturesSection