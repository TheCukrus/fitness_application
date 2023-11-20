import { useState } from "react"
import { Col, Row, Button } from "react-bootstrap"
import SingleProgramCard from "./SingleProgramCard.jsx"
import s from "../../assets/styles/ProgramsCards.module.css"

const ProgramCards = ({ programsSettings, programs }) =>
{
    const [visibleItemsCount, setVisibleItemsCount] = useState(8)

    const filteredData = programs
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
                return 0
            }
        })

    const currentItems = filteredData.slice(0, visibleItemsCount)

    const loadMoreItems = () =>
    {
        setVisibleItemsCount((prevCount) => prevCount + 8)
    }

    return (
        <>
            <Row xs={1} md={2} lg={3} xxl={4} className={s.programs_grid}>
                {currentItems.map((program, index) => (
                    <Col key={program.id} className={s.program_card_col} style={{ animationDelay: `${index * 100}ms` }}>
                        <SingleProgramCard program={program} />
                    </Col>
                ))}
            </Row>
            {visibleItemsCount < filteredData.length && (
                <div className="d-flex justify-content-center my-4">
                    <Button onClick={loadMoreItems} variant="primary" size="lg">
                        Load More
                    </Button>
                </div>
            )}
        </>
    )
}

export default ProgramCards
