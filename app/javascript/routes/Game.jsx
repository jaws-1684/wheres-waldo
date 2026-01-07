import React, {useState, createContext, useEffect } from "react"
import WheresWaldo from "../components/WheresWaldo"
import { useOutletContext, useParams } from "react-router-dom"
import Counter  from "../components/Counter"
import { useFetch } from "../components/App"
import { useNavigate } from "react-router-dom"
export const WaldosContext = createContext({count: 0})
export const MagnifierContext = createContext(null)

function SignUp ({bestTime=20}) {
    const [input, setInput] = useState("")
    let navigate = useNavigate();
    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "/users/create";


        const body = {
            user: { username: input, game_times_attributes: [{ best_time: bestTime }] }
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
    return <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username:</label>
        <input
            value={input} 
            onChange={(e) => setInput(e.target.value)}  
            name="username"/>
        <button type="submit">Submit</button>    
    </form>
}
function GameEnd () {
    const [time, setTime] = useState({})

    useEffect(() => {
        let ignore = false;
        useFetch("/times").then((res) => {
            if (!ignore) {
                setTime(res.time);
            }
        });
        
        return () => {
            ignore = true;
        }
    }, []);

    return <div>Game ended. Your time was: {time.minutes} minutes and {time.seconds} seconds.</div>
}

export default function Game () {
    const { images } = useOutletContext()
    const params = useParams()
    const id = Number(params.id) % images.length
    let [ image ] = images.filter(img => img.id == id)
    
    if (!image) {
        image = images[0]
    }
    useEffect(() => { 
       fetch("/times/new")
    }, [])
    const image_large = image.url
    const waldos = image.waldos
    const [waldosIdentified, setWaldosIdentified] = useState({total: waldos, count: 0, positions: []})
    const [magnifierActivated, setMagnifierActivated] = useState(false)
    const handleClick = () => setMagnifierActivated(!magnifierActivated)

    if (waldosIdentified.count === waldosIdentified.total) {
            return <GameEnd/>
    }
    return(<>
    <SignUp/>
     <WaldosContext value={{waldosIdentified, setWaldosIdentified}}>
        <h1>Hint: You have to find {waldos} Waldos in this puzzle</h1>
        <h2>Waldos left: {waldos - waldosIdentified.count}</h2>
        <MagnifierContext value={{magnifierActivated}}>
            <div className="utils">
                <p>Your time: </p><Counter/>
                <button style={{width: "fit-content"}} onClick={() => handleClick()}>Magnifier</button>
            </div>
            <WheresWaldo largeImage={image_large}/>
        </MagnifierContext>
      </WaldosContext>        
    </>)
}