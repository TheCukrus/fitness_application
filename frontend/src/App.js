import React from "react"
import { Routes, Route } from "react-router-dom"

import "./assets/styles/App.css"
import Home from "./pages/Home.js"
import Cart from "./pages/Cart.js"
import Header from "./components/common/Header.jsx"
import Footer from "./components/common/Footer.jsx"

const App = () =>
{
  return (
    <div className="main-container">

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />

    </div>
  )
}

export default App