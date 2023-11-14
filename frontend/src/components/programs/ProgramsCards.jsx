import React from "react"
import { Col, Row } from "react-bootstrap"
import SingleProgramCard from "./SingleProgramCard.jsx"
import s from "../../assets/styles/ProgramsCards.module.css"

const ProgramCards = ({ programsSettings, programs }) =>
{
    const data = programs
        .filter((ele) => ele.category.includes(programsSettings.filter))
        .filter((ele) => ele.name.toLowerCase().includes(programsSettings.search.toLowerCase()))
        .sort((a, b) =>
        {
            if (programsSettings.sort === "nameAsc")
            {
                return a.name.localeCompare(b.name)
            }
            else if (programsSettings.sort === "nameDesc")
            {
                return b.name.localeCompare(a.name)
            }
            else if (programsSettings.sort === "priceAsc")
            {
                return parseFloat(a.price) - parseFloat(b.price)
            }
            else if (programsSettings.sort === "priceDesc")
            {
                return parseFloat(b.price) - parseFloat(a.price)
            }
            else
            {
                return a
            }
        })

    return (
        <Row xs={1} md={2} lg={3} xxl={4} className={s.programs_grid}>
            {data.map((program, index) => (
                <Col key={program.name} className={s.program_card_col} style={{ animationDelay: `${index * 100}ms` }}>
                    <SingleProgramCard program={program} />
                </Col>
            ))}
        </Row>
    );
}

export default ProgramCards
