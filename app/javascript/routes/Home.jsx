import React, { useContext, useState, createContext } from "react"
import WheresWaldo from "../components/WheresWaldo"
import { useOutletContext } from "react-router-dom"
import { WaldosContext } from "../components/App"

export const MagnifierContext = createContext(null)

export default function Home () {
    const { image_large } = useOutletContext()
    const { waldosIdentified } = useContext(WaldosContext)
    const [magnifierActivated, setMagnifierActivated] = useState(false)
    const handleClick = () => setMagnifierActivated(!magnifierActivated)

    if (waldosIdentified.count === waldosIdentified.total) {
        return <div>Game ended</div>
    }
    return(<>
     <MagnifierContext value={{magnifierActivated}}>
        <div>
            <button style={{width: "fit-content"}} onClick={() => handleClick()}>Magnifier</button>
        </div>
        <WheresWaldo largeImage={image_large}/>
     </MagnifierContext>   
    </>)
}