import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"

import "../assets/styles/Programs.css"
import HeroBanner from "../components/common/HeroBanner"
import ProgramCards from "../components/programs/ProgramsCards.jsx"
import ProgramsNavBar from "../components/programs/ProgramsNavBar.jsx"
import programService from "../services/programService.js"

const Programs = () =>
{
    const [programs, setPrograms] = useState([])

    const [programsSettings, setProgramsSettings] = useState({
        filter: "",
        search: "",
        sort: ""
    })

    const fetchProgramList = async () =>
    {
        try
        {
            const programs = await programService.getAllPrograms()
            setPrograms(programs)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    useEffect(() => { fetchProgramList() }, [])

    return (
        <div >
            <HeroBanner
                title="Unlock Your Full Potential with Our Programs"
                subtitle="Change your life"
                backgroundImg="/assets/images/programsHeroImage.png"
            />
            <ProgramsNavBar programsSettings={programsSettings} setProgramsSettings={setProgramsSettings} />
            <Container >
                <div className="d-flex flex-wrap justify-content-center">
                    <ProgramCards programsSettings={programsSettings} programs={programs} />
                </div>
            </Container>
        </div>
    )
}

export default Programs