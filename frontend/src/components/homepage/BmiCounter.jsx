import { useState } from "react"
import bmiPhoto from "../../assets/images/bmi_calculator.jpg"
import "../../assets/styles/BmiCounter.css"

const BmiCounter = () =>
{
    const [bmi, setBmi] = useState({ weight: 0, height: 0 })
    const [bmiResult, setBmiResult] = useState(null)

    const bmiCount = (e) =>
    {
        e.preventDefault()
        const arg1 = bmi.weight
        const arg2 = bmi.height / 100
        const result = (arg1 / (arg2 * arg2)).toFixed(2)

        if (result < 18.5)
        {
            return setBmiResult({ bmi: result, status: "Underweight" })
        }

        if ((result > 18.4) && (result < 25))
        {
            return setBmiResult({ bmi: result, status: "Normal weight" })
        }

        if ((result > 24.9) && (result < 30))
        {
            return setBmiResult({ bmi: result, status: "Overweight" })
        }

        if ((result > 29.9) && (result < 35))
        {
            return setBmiResult({ bmi: result, status: "Obesity (Class1)" })
        }

        if ((result > 34.9) && (result < 40))
        {
            return setBmiResult({ bmi: result, status: "Obesity (Class2)" })
        }

        if (result > 39.9)
        {
            return setBmiResult({ bmi: result, status: "Obesity (Class3)" })
        }
    }

    return (
        <div>
            <div className="bmi-counter-container">
                <h2>Calculate your BMI</h2>

                <div className="bmi-counter">
                    {!bmiResult
                        ? (
                            <form onSubmit={bmiCount} className="bmi-counter-form">
                                <h3>Calculate your BMI</h3>

                                <label>Your height in cm:
                                    <input type="number" value={bmi.height} onChange={(e) => setBmi({ ...bmi, height: e.target.value })} />
                                </label>

                                <label>Your weight in kg:
                                    <input type="number" value={bmi.weight} onChange={(e) => setBmi({ ...bmi, weight: e.target.value })} />
                                </label>

                                <input type="submit" value="Calculate Bmi" />
                            </form>
                        ) :
                        (
                            <div className="bmi-counter-result">
                                <h3>Results:</h3>
                                <p className="result-text">Your calculated BMI is <b>{bmiResult.bmi}</b>.</p>
                                <p className="result-text">This places you in the category of <b>{bmiResult.status}</b>.</p>
                                <br />
                                <p className="result-description">BMI is a measure of body fat based on height and weight.</p>
                                <button onClick={() => setBmiResult(null)}>Recalculate</button>
                            </div>
                        )
                    }
                    <img src={bmiPhoto} alt="bmi" />
                </div>
            </div>
        </div>
    )
}

export default BmiCounter


