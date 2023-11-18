import { useState, useEffect } from "react"
import s from "../../assets/styles/CartProcess.module.css"
import { BsCheckLg } from "react-icons/bs"

// Helper function to get line class
const getLineClass = (status) =>
{
  switch (status)
  {
    case "active":
      return s.activeLine
    case "completed":
      return s.completedLine
    default:
      return s.defaultLine
  }
}

// Helper function to get number class
const getNumberClass = (status) =>
{
  switch (status)
  {
    case "active":
      return s.activeProcessNumber
    case "completed":
      return s.completedProcessNumber
    default:
      return s.defaultProcessNumber
  }
}

// Helper function to get icon or number
const getIconOrNumber = (status, stepNumber) =>
{
  return status === "completed" ? <BsCheckLg color="white" /> : stepNumber
}

const CartProcess = ({ process }) =>
{
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() =>
  {
    const handleResize = () =>
    {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = windowWidth < 768

  const renderProcessStep = (step, stepNumber) =>
  {
    // Only show the active/completed step on mobile
    if (isMobile && process[step] !== "active" && process[step] !== "completed")
    {
      return null
    }

    return (
      <div key={step} className={`${s.process} ${getLineClass(process[step])}`}>
        <p>
          <span className={`${s.process_number} ${getNumberClass(process[step])}`}>
            {getIconOrNumber(process[step], stepNumber)}
          </span>
          {stepNumber === 1 ? " Shopping Cart" : stepNumber === 2 ? " Checkout Details" : " Order Complete"}
        </p>
      </div>
    )
  }

  return (
    <div className={s.shoping_process}>
      {Object.keys(process).map((key, index) => renderProcessStep(key, index + 1))}
    </div>
  )
}

export default CartProcess
