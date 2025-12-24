import React, {useState, createContext } from "react"
import WheresWaldo from "../components/WheresWaldo"
import { useOutletContext, useParams } from "react-router-dom"
import Counter  from "../components/Counter"
export const WaldosContext = createContext({count: 0})
export const MagnifierContext = createContext(null)

export default function Game () {
    const { images } = useOutletContext()
    const params = useParams()
    const id = Number(params.id) % images.length
    let [ image ] = images.filter(img => img.id == id)
    
    if (!image) {
        image = images[0]
    }
    const image_large = image.url
    const waldos = images.waldos
    const [waldosIdentified, setWaldosIdentified] = useState({total: waldos, count: 0, positions: []})
    const [magnifierActivated, setMagnifierActivated] = useState(false)
    const handleClick = () => setMagnifierActivated(!magnifierActivated)

    if (waldosIdentified.count === waldosIdentified.total) {
        return <div>Game ended</div>
    }
    return(<>
     <WaldosContext value={{waldosIdentified, setWaldosIdentified}}>
        <MagnifierContext value={{magnifierActivated}}>
            <Counter/>
            <div>
                <button style={{width: "fit-content"}} onClick={() => handleClick()}>Magnifier</button>
            </div>
            <WheresWaldo largeImage={image_large}/>
        </MagnifierContext>
      </WaldosContext>        
    </>)
}