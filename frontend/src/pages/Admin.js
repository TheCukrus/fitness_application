import { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import s from "../assets/styles/AdminPage.module.css"
import CategoriesList from "../components/adminPage/CategoriesList.jsx"
import CreateCategory from "../components/adminPage/CreateCategory.jsx"
import CreateProgram from "../components/adminPage/CreateProgram.jsx"
import ProgramList from "../components/adminPage/ProgramsList.jsx"
import programService from "../services/programService.js"

const Admin = () =>
{

    const [programList, setProgramList] = useState([])

    const fetchProgramList = async () =>
    {
        try
        {
            const programs = await programService.getAllPrograms()
            setProgramList(programs)
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <div>
            <Tabs defaultActiveKey="CreateProgram" className="mb-3" justify fill>
                <Tab eventKey="CreateCategory" title="Create Category">
                    <h2 className={s.header2}>Create Category</h2>
                    <CreateCategory />
                </Tab>

                <Tab eventKey="CreateProgram" title="Create Program">
                    <h2 className={s.header2}>Create Program</h2>
                    <CreateProgram fetchProgramList={fetchProgramList} />
                </Tab>

                <Tab eventKey="CategoriesList" title="Categories List">
                    <h2 className={s.header2}>Categories List</h2>
                    <CategoriesList />
                </Tab>

                <Tab eventKey="ProgramList" title="Program List">
                    <h2 className={s.header2}>Program List</h2>
                    <ProgramList programList={programList} fetchProgramList={fetchProgramList} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Admin