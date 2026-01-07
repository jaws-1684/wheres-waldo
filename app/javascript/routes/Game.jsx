import React, {useState, createContext, useEffect } from "react"
import WheresWaldo from "../components/WheresWaldo"
import { useOutletContext, useParams } from "react-router-dom"
import Counter  from "../components/Counter"
import { useFetch } from "../components/App"
import styled from "styled-components"
import SignUp from "../components/SignUp"
import { Search } from "lucide-react"
export const WaldosContext = createContext({count: 0})
export const MagnifierContext = createContext(null)


const Modal = styled.div`
    position: fixed;
    top: 50vh;
    left: 40vw;
    width: fit-content;
    background: white;
    padding: 1rem;
    border-radius: 5px;   
`

function GameEnd ({setTimerActivated}) {
    const [time, setTime] = useState({})

    useEffect(() => {
        let ignore = false;
        useFetch("/times").then((res) => {
            if (!ignore) {
                setTime(res.time);
                setTimerActivated(false);
            }
        });
        
        return () => {
            ignore = true;
        }
    }, []);

    return <Modal>
           <SignUp time={time}/>
            <p>Game ended. Your time was: {time.minutes} minutes and {time.seconds} seconds.</p>
           </Modal>
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
    const [timerActivated, setTimerActivated] = useState(true)
    const allWaldosIndentified = waldosIdentified.count === waldosIdentified.total;
    const handleClick = () => setMagnifierActivated(!magnifierActivated)

    return(<>
     <WaldosContext value={{waldosIdentified, setWaldosIdentified}}>
        { allWaldosIndentified && <GameEnd setTimerActivated={setTimerActivated}/>}
        <h1>Hint: You have to find {waldos} Waldos in this puzzle</h1>
        <h2>Waldos left: {waldos - waldosIdentified.count}</h2>
        <MagnifierContext value={{magnifierActivated}}>
            <div className="utils">
                <p>Your time: </p><Counter timerActivated={timerActivated}/>
                 <Search className="magnifier" style={{width: "fit-content"}} onClick={() => handleClick()}/>
            </div>
            <WheresWaldo largeImage={image_large}/>
        </MagnifierContext>
      </WaldosContext>        
    </>)
}