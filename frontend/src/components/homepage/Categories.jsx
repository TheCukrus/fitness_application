import React from "react"
import Slider from "react-slick"
import { Link } from "react-router-dom"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],

    }

    return (
        <div className="categories-container">
            <h2>Categories</h2>
            <Slider {...settings}>
                {categories.map((ele) =>
                {
                    return (
                        <Link to={ele.path} className="category-card" key={ele.title}>
                            <div className="category-text" >
                                <h2>{ele.title}</h2>
                                <p>{ele.description}</p>
                            </div>
                            <img src={ele.imagePath} alt={ele.title} className="category-img" />
                            <div className="category-overlay"></div>
                        </Link>
                    )
                })}
            </Slider>
        </div>
    )
}

export default Categories

