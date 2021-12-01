import "./contact.scss"
import { useState } from "react";
import { backendURL } from "../../Constants";

export default function Contact() {

    const contactEmailURL = backendURL + "/contactEmail";
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(contactEmailURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: e.target.email.value,
                body: e.target.message.value,
            })
        })
        .then((response) => {
            setLoading(false);
            setMessage(true);
            setTimeout(() => {
                setMessage(false);
            }, 2000);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            setMessage(false);
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
        })
    }

    return (
        <div className='contact' id='contact'>
            <div className="left">
                <img src="assets/handshake.png" alt="" />
            </div>
            <div className="right">
                <h2>
                    Contact.
                </h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" />
                    <textarea name="message" placeholder="Message"></textarea>
                    <button type="submit">Send</button>
                    {message && <span>Thanks, I'll reply ASAP :)</span>}
                    {error && <span font-color="red">Error in sending Email :(</span>}
                    {loading && <span>Sending Email...</span>}
                </form>
            </div>
        </div>
    )
}
