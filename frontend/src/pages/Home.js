import React from "react"
import HeroSection from "../components/homepage/HeroSection.jsx"
import StatisticsSection from "../components/homepage/StatisticSection.jsx"
import FeaturesSection from "../components/homepage/FeatureSection.jsx"
import LatestPrograms from "../components/homepage/LatestPrograms.jsx"
import Testimonials from "../components/homepage/Testimonials.jsx"
import Contact from "../components/homepage/Contact.jsx"

const Home = () =>
{

    return (
        <div>
            <HeroSection />
            <StatisticsSection />
            <FeaturesSection />
            <LatestPrograms />
            <Testimonials />
            <Contact />
        </div>
    )
}

export default Home