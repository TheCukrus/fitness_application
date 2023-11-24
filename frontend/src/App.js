import React from "react"
import { Routes, Route } from "react-router-dom"

import "./assets/styles/App.css"
import Home from "./pages/Home.js"
import Cart from "./pages/Cart.js"
import Header from "./components/common/Header.jsx"
import Footer from "./components/common/Footer.jsx"
import Programs from "./pages/Programs.js"
import Admin from "./pages/Admin.js"
import SignUp from "./components/auth/SignUp.jsx"
import Login from "./components/auth/Login.jsx"
import Notification from "./components/notification/Notification.jsx"
import { useUserContext } from "./contexts/ContextUser.js"
import ProgramDetails from "./pages/ProgramDetails.js"
import AboutUs from "./pages/AboutUs"
import UserProfile from "./pages/UserProfile"

const App = () =>
{
  const { user, adminRights } = useUserContext()

  return (
    <div className="main-container">

      <Header />
      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetails />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* Checking if user authorized to enter cart */}
        {user ? <Route path="/cart" element={<Cart />} /> : null}
        {user ? <Route path="/user/:id" element={<UserProfile />} /> : null}

        {/* Checking if user has right to enter admin page */}
        {adminRights ? <Route path="/admin" element={<Admin />} /> : null}

        {!user ? <Route path="/signup" element={<SignUp />} /> : null}
        {!user ? <Route path="/login" element={<Login />} /> : null}

      </Routes>

      <Footer />

    </div>
  )
}

export default App