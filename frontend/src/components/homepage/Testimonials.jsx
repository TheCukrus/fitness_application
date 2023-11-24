import React from "react"
import { Container, Row, Col, Carousel } from "react-bootstrap"
import s from "../../assets/styles/Testimonials.module.css"
import { useInView } from "react-intersection-observer"
import { FaQuoteLeft } from "react-icons/fa"

const testimonials = [
    {
        quote: "Train Bliss's innovative approach to fitness has reignited my passion for health and wellness.",
        author: "Sophia Berger",
        role: "Cycling Enthusiast",
    },
    {
        quote: "The dedication of the trainers at Train Bliss is unparalleled. I've achieved goals I never thought possible!",
        author: "Liam Schmitz",
        role: "Triathlete",
    },
    {
        quote: "As a busy professional, I appreciate the flexibility of Train Bliss's programs that fit into my hectic schedule.",
        author: "Olivia Eklund",
        role: "Working Professional & Yoga Practitioner",
    },
    {
        quote: "Thanks to Train Bliss, I've found a community that supports and challenges me to be my best self.",
        author: "Ethan Dubois",
        role: "Outdoor Adventure Lover",
    },
    {
        quote: "The holistic approach to fitness at Train Bliss is refreshing. It's about more than just physical strength.",
        author: "Amelia Ivanova",
        role: "Dance Fitness Advocate",
    },
    {
        quote: "I'm grateful for the personal growth I've experienced through the unique programs offered at Train Bliss.",
        author: "Noah Rossi",
        role: "Gymnastics Coach",
    },
    {
        quote: "Finding a supportive fitness environment was crucial for me, and Train Bliss exceeded all my expectations.",
        author: "Isabella Conti",
        role: "Pilates Instructor",
    },
    {
        quote: "Train Bliss helped me rediscover the joy of movement and the importance of a balanced lifestyle.",
        author: "Alexander Petrov",
        role: "Health & Fitness Blogger",
    },
    {
        quote: "The expert advice and tailored workouts I received at Train Bliss have been transformative.",
        author: "Mia Wagner",
        role: "Rock Climbing Enthusiast",
    },
    {
        quote: "Joining Train Bliss was a game-changer for my fitness journey. The results speak for themselves!",
        author: "Lucas Andersen",
        role: "Amateur Powerlifter",
    },
]

const Testimonials = () =>
{
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true
    })

    return (
        <Container fluid className={s.testimonialsContainer} ref={ref}>
            <Row className="justify-content-center text-center mb-5">
                <Col lg={8}>
                    <h2 className={`${s.heading} ${inView ? s.fadeIn : ""}`}>What Our Members Say</h2>
                </Col>
            </Row>
            <Carousel indicators={false} className={`${s.carousel} ${inView ? s.slideIn : ""}`}>
                {testimonials.map((testimonial, index) => (
                    <Carousel.Item key={index} className={s.testimonialItem}>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} className={s.testimonialContent}>
                                <FaQuoteLeft className={s.quoteIcon} />
                                <p className={s.quote}>{testimonial.quote}</p>
                                <footer className={s.testimonialFooter}>
                                    <strong className={s.author}>{testimonial.author}</strong>
                                    <div className={s.role}>{testimonial.role}</div>
                                </footer>
                            </Col>
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    )
}

export default Testimonials
