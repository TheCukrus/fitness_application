import { useState } from "react"
import "../../assets/styles/Contact.css"

const Contact = () =>
{

    const [message, setMessage] = useState({ name: "", email: "", category: "No theme", message: "" })

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        console.log(message)
    }

    return (
        <div className="contact-container">
            <h2>Contact us</h2>

            <form onSubmit={handleSubmit} className="contact-form">
                <label>
                    Name:
                    <input type="text" name="name" value={message.name} onChange={(e) => setMessage({ ...message, name: e.target.value })} required />
                </label>

                <label>
                    Email:
                    <input type="email" name="email" value={message.email} onChange={(e) => setMessage({ ...message, email: e.target.value })} required />
                </label>

                <label>
                    Choose category:
                    <select name="category" value={message.category} onChange={(e) => setMessage({ ...message, category: e.target.value })}>
                        <option>No theme</option>
                        <option>Impove website</option>
                        <option>Personal program</option>
                    </select>
                </label>

                <label>
                    Message:
                    <textarea name="message" value={message.message} onChange={(e) => setMessage({ ...message, message: e.target.value })} required />
                </label>

                <input type="submit" />
            </form>
        </div>
    )
}

export default Contact