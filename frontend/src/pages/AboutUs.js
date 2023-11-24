import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useInView } from "react-intersection-observer"
import s from "../assets/styles/AboutUs.module.css"

const Section = ({ title, content, imgSrc, altText, order }) => {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [imageRef, imageInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <Row className={s.section}>
      <Col md={6} className={`${s.textCol} ${order % 2 === 0 ? "order-md-last" : ""}`}>
        <h2 ref={titleRef} className={`${s.title} ${titleInView ? s.slideInLeft : ""}`}>{title}</h2>
        <p ref={contentRef} className={`${s.content} ${contentInView ? s.slideInRight : ""}`}>{content}</p>
      </Col>
      <Col md={6} className={s.imageCol}>
        <img ref={imageRef} src={imgSrc} alt={altText} className={`${s.image} ${imageInView ? s.zoomIn : ""}`} />
      </Col>
    </Row>
  )
}

const AboutUs = () => {
  return (
    <Container className={s.aboutUsContainer}>
      <Section
        title="Our Vision"
        content="A world where every individual is empowered to pursue fitness in a way that fits their unique lifestyle. We believe in creating an inclusive community where everyone's fitness journey is supported and celebrated."
        imgSrc={"/assets/images/ourVision.png"}
        altText="Our Vision"
        order={1}
      />
      <Section
        title="Our Approach"
        content="Our holistic approach to wellness encompasses not just physical strength, but also mental and emotional health. We're committed to providing resources that help our members thrive in every aspect of life."
        imgSrc={"/assets/images/ourApproach.png"}
        altText="Our Approach"
        order={2}
      />
      <Section
        title="Our Process"
        content="From personal training to group classes, our diverse offerings are designed to meet you where you are. Our expert trainers work with you to create a personalized plan that aligns with your goals and lifestyle."
        imgSrc={"/assets/images/ourProcess.png"}
        altText="Our Process"
        order={3}
      />
    </Container>
  )
}

export default AboutUs
