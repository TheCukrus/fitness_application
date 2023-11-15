import React, { useState, useEffect, useCallback } from "react"
import { FaStar } from "react-icons/fa"
import programService from "../../services/programService.js"
import { useNotificationContext } from "../../contexts/ContextNotification.js"

const StarRating = ({ programId }) => {
  const { showToast } = useNotificationContext()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)

  // Fetch average rating when component mounts
  useEffect(() => {
    const fetchAverageProgram = async () => {
      try {
        const response = await programService.getProgramRating(programId)
        if (response.type === "success") {
          setRating(response.averageRating)
        }
      } catch (err) {
        showToast("Unable to fetch ratings", "error")
      }
    }

    fetchAverageProgram()
  }, [programId, showToast])

  // Submit rating, useCallback will ensure the function is not recreated on every render
  const submitRating = useCallback(async (newRating) => {
    try {
      const response = await programService.rateProgram(programId, newRating)
      showToast(response.notification, response.type)
    } catch (err) {
      showToast("Failed to submit rating", "error")
    }
  }, [programId, showToast])

  // Handle clicking on a star
  const handleRating = (ratingValue) => {
    setRating(ratingValue)
    submitRating(ratingValue)
  }

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: 'pointer' }}
            />
          </label>
        )
      })}
      <span>({rating.toFixed(1)})</span>
    </div>
  )
}

export default StarRating
