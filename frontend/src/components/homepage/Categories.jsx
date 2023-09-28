import React from "react"
import { Link } from "react-router-dom"

import "../../assets/styles/Categories.css"
import meal_plan from "../../assets/images/meal_plan.jpg"
import strenght_training from "../../assets/images/strenght_training.jpg"
import cardio_workout from "../../assets/images/cardio_workout.jpg"
import yoga_meditation from "../../assets/images/yoga_meditation.jpg"

const Categories = () =>
{

    const categories = [
        {
            id: 1,
            title: "Meal Plans",
            description: "Discover nutritious meal plans tailored to your goals.",
            imagePath: meal_plan,
            path: "/categories/meal_plans",
        },
        {
            id: 2,
            title: "Strength Training",
            description: "Build muscle and strength with effective training programs.",
            imagePath: strenght_training,
            path: "/categories/strength_training",
        },
        {
            id: 3,
            title: "Cardio Workouts",
            description: "Improve cardiovascular health with dynamic cardio routines.",
            imagePath: cardio_workout,
            path: "/categories/cardio",

        },
        {
            id: 4,
            title: "Yoga & Meditation",
            description: "Find balance and relaxation through yoga and meditation.",
            imagePath: yoga_meditation,
            path: "/categories/yoga"

        }
    ]

    return (
        <div className="categories-container">

            {
                categories.map((ele) => (
                    <Link key={ele.title} to={ele.path} className="categories-link">
                        <div className="categories-image">
                            <img src={ele.imagePath} alt={ele.title} />
                        </div>

                        <div className="categories-text">
                            <h2>{ele.title}</h2>
                            <p>{ele.description}</p>
                        </div>
                    </Link>
                ))
            }

        </div>
    )
}

export default Categories

