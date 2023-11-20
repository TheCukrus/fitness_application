import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useCategoriesContext } from "../../contexts/ContextCategories.js"
import "../../assets/styles/ProgramsNavBar.css"
import { FaSlidersH, FaFilter, FaSearch } from "react-icons/fa"


const ProgramsNavBar = ({ programsSettings, setProgramsSettings }) =>
{
    const { categories } = useCategoriesContext()

    return (
        <Container className="programs-nav-bar">
            <Row >
                <Col sm={12} md={4} >
                    <div className="input-group">
                        <div className="input-icon">
                            <FaSlidersH className="icon" />
                        </div>
                        <select className="custom-select" onChange={(e) => setProgramsSettings({ ...programsSettings, filter: e.target.value })}>
                            <option value={""}>All Categories</option>
                            {categories.map((ele) => (
                                <option key={ele.id} value={ele.title}>{ele.title}</option>
                            ))}
                        </select>
                    </div>
                </Col>

                <Col sm={12} md={4}>
                    <div className="input-group">
                        <div className="input-icon">
                            <FaSearch className="icon" />
                        </div>
                        <input type="search" className="custom-input" placeholder="Search" value={programsSettings.search} onChange={(e) => setProgramsSettings({ ...programsSettings, search: e.target.value })} />
                    </div>
                </Col>

                <Col sm={12} md={4}>
                    <div className="input-group">
                        <div className="input-icon">
                            <FaFilter className="icon" />
                        </div>
                        <select className="custom-select" onChange={(e) => setProgramsSettings({ ...programsSettings, sort: e.target.value })}>
                            <option value="">Default</option>
                            <option value="nameAsc">Name (A-Z)</option>
                            <option value="nameDesc">Name (Z-A)</option>
                            <option value="priceAsc">Price (Low to High)</option>
                            <option value="priceDesc">Price (High to Low)</option>
                        </select>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProgramsNavBar