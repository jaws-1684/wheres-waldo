import React, {useState } from "react"
import { useNavigate } from "react-router-dom"

function formatTime(minutes, seconds) {
    return minutes.toString() + ":" + seconds.toString()
}
export default function SignUp ({time=20}) {
    const [input, setInput] = useState("")
    const [errors, setErrors] = useState("")
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input === "") {
            setErrors("Username cannot be blank!")
            return
        }
        const url = "/users/create";


        const body = {
            user: { username: input, game_times_attributes: [{ best_time: formatTime(time.minutes, time.seconds) }] }
        };
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        })
        .then((response) => {
            if (response.ok) {
            return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((response) => navigate(`/dashboard`))
        .catch((error) => console.log(error.message));
    };
    return <>
    {errors.length > 0 && <p style={{color: "red"}}>{errors}</p>}
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "5px"}}>
        <div>
         <label htmlFor="username" style={{marginRight: "0.5rem"}}><strong>Enter your username:</strong></label>
        <input
            value={input} 
            onChange={(e) => setInput(e.target.value)}  
            name="username"/>
        </div>
        <div style={{alignSelf: "flex-end"}}>
         <button className="user-submit" type="submit">Submit</button>   
        </div>
        
    </form>
    </>
}