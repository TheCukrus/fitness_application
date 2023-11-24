import { useState, useEffect } from "react"
import { Row, Col, Container } from "react-bootstrap"
import { useInView } from "react-intersection-observer"
import s from "../../assets/styles/LatestPrograms.module.css"
import programService from "../../services/programService"
import SingleProgramCard from "../programs/SingleProgramCard"

const LatestPrograms = () => 
{
    const [latestPrograms, setLatestPrograms] = useState([])
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    })

    const reversedLatestPrograms = latestPrograms.toReversed()

    const fetchPrograms = async () =>
    {
        try
        {
            const latestPrograms = await programService.getAllPrograms()
            setLatestPrograms(latestPrograms)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    const animationClassFadeIn = inView ? s.fadeInAnimate : ""
    const animationClassSCaleUp = inView ? s.scaleUpAnimate : ""

    useEffect(() => { fetchPrograms(); }, [])

    return (
        <Container fluid className={s.latestProgramsSection} ref={ref}>
            <Row className="justify-content-center text-center mb-4">
                <Col lg={8}>
                    <h2 className={`${s.sectionHeading} ${animationClassFadeIn}`}>Latest Programs</h2>
                    <p className={`${s.sectionSubtitle} ${animationClassFadeIn}`}>
                        Check out our newest fitness programs designed to revolutionize your workout.
                    </p>
                </Col>
            </Row>
            <Row className={s.row}>
                {reversedLatestPrograms.slice(0, 4).map((program) => (
                    <Col key={program.id} xs={12} sm={6} md={4} lg={3} xxl={2} className={`${s.col} ${animationClassSCaleUp}`}>
                        <SingleProgramCard program={program} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default LatestPrograms