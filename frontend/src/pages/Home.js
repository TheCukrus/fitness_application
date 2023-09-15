import React from "react"

import BmiCounter from "../components/homepage/BmiCounter.jsx"
import Categories from "../components/homepage/Categories.jsx"
import HeroImage from "../components/homepage/HeroImage.jsx"
import Contact from "../components/homepage/Contact.jsx"
// import FeaturedPrograms from "../components/homepage/FeaturedPrograms.jsx"
// import Testimonials from "../components/homepage/Testimonials.jsx"

const Home = () =>
{

    return (
        <div>
            <HeroImage />
            <Categories />
            {/*
            <FeaturedPrograms />
            <Testimonials />
    */}
            <BmiCounter />
            <Contact />
        </div>
    )
}

export default Home