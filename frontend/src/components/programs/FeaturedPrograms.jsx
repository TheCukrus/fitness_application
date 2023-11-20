import { useState, useEffect } from "react"
import { Container, Col, Row, Image } from "react-bootstrap"
import s from "../../assets/styles/FeaturedPrograms.module.css"
import SingleProgramCard from "./SingleProgramCard.jsx"
import programService from "../../services/programService.js"
import { useParams } from "react-router-dom"

const FeaturedPrograms = () =>
{
    const programId = useParams()
    const [featuredPrograms, setFeaturedPrograms] = useState([])

    const fetchPrograms = async () =>
    {
        try
        {
            const programs = await programService.getAllPrograms()
            const filteredFeaturedPrograms = programs.filter((ele) => programId.id !== ele.id)
            return setFeaturedPrograms(filteredFeaturedPrograms)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() => { fetchPrograms(); }, [])

    return (
        <Container className={s.featuredContainer}>
            <h1 className={s.title}>Featured Programs</h1>
            <p className={s.description}>Explore our signature fitness series, combining innovative exercises with proven methods to help you gain strength, increase flexibility, and improve overall health</p>
            <hr />

            <Row className={s.programsRow}>
                <Col md={6} className={s.programImageCol}>
                    <Image fluid src="/assets/images/featuredPrograms.png" />
                </Col>
                <Col md={6}>
                    <Row>
                        {featuredPrograms.slice(0, 2).map((ele) => (
                            <Col md={6} key={ele.id} className={s.singleProgramsCol}>
                                <SingleProgramCard program={ele} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container >
    )
}

export default FeaturedPrograms