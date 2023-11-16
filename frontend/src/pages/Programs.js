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

// const categories = [
//     {
//         name: "Meal Plans",
//         description: "Discover a variety of meal plans tailored to your dietary preferences and health goals.",
//         programs: [
//             { id: 1, name: "Healthy Eating 101", description: "Learn the basics of a balanced diet.", image: "temp.jpg" },
//             { id: 2, name: "Weight Loss Diet", description: "Achieve your weight loss goals with this diet plan.", image: "temp.jpg" },
//             { id: 3, name: "Vegan Meal Plan", description: "Explore plant-based meal options with this plan.", image: "temp.jpg" },
//             { id: 4, name: "Muscle Gain Diet", description: "Build muscle with a protein-rich diet plan.", image: "temp.jpg" },
//             { id: 5, name: "Low-Carb Recipes", description: "Discover low-carb recipes for a healthier lifestyle.", image: "temp.jpg" },
//         ],
//     },
//     {
//         name: "Strength Training",
//         description: "Build strength and muscle with our effective strength training programs.",
//         programs: [
//             { id: 6, name: "Beginner's Strength", description: "Start your strength journey with this beginner's program.", image: "temp.jpg" },
//             { id: 7, name: "Intermediate Workouts", description: "Advance your strength with intermediate-level workouts.", image: "temp.jpg" },
//             { id: 8, name: "Advanced Powerlifting", description: "Master powerlifting techniques with this program.", image: "temp.jpg" },
//             { id: 9, name: "Full-Body Workouts", description: "Target all muscle groups with full-body workouts.", image: "temp.jpg" },
//             { id: 10, name: "Bodyweight Exercises", description: "Build strength using your bodyweight.", image: "temp.jpg" },
//         ],
//     },
//     {
//         name: "Cardio Workouts",
//         description: "Improve your cardiovascular fitness with our cardio workout programs.",
//         programs: [
//             { id: 11, name: "High-Intensity Interval Training (HIIT)", description: "Burn calories with high-intensity intervals.", image: "temp.jpg" },
//             { id: 12, name: "Running for Beginners", description: "Start running with this beginner's guide.", image: "temp.jpg" },
//             { id: 13, name: "Cycling Adventures", description: "Explore cycling routes and workouts.", image: "temp.jpg" },
//             { id: 14, name: "Dance Cardio", description: "Dance your way to fitness with cardio routines.", image: "temp.jpg" },
//             { id: 15, name: "Swimming for Fitness", description: "Get fit with swimming workouts.", image: "temp.jpg" },
//         ],
//     },
//     {
//         name: "Yoga & Meditation",
//         description: "Find balance and relaxation with our yoga and meditation programs.",
//         programs: [
//             { id: 16, name: "Yoga for Stress Relief", description: "Relieve stress and calm your mind with yoga.", image: "temp.jpg" },
//             { id: 17, name: "Meditation for Beginners", description: "Start meditating with this beginner's guide.", image: "temp.jpg" },
//             { id: 18, name: "Advanced Yoga Poses", description: "Challenge yourself with advanced yoga poses.", image: "temp.jpg" },
//             { id: 19, name: "Mindfulness Meditation", description: "Practice mindfulness and focus with meditation.", image: "temp.jpg" },
//             { id: 20, name: "Yin Yoga for Flexibility", description: "Improve flexibility with Yin Yoga.", image: "temp.jpg" },
//         ],
//     },
// ]
