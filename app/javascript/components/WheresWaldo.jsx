import React, { useRef, useState } from "react"
import Magnifier from "./Magnifier"
import HResImage from "./HResImage"
import styled from "styled-components"
import Select from "./Select"

const Container = styled.div`
    margin-left: 10vw;
    margin-right: 10vw;
`
export default function WheresWaldo({largeImage}) {
    const [backgroundPosition, setBackgroundPosition] = useState({backgroundPosition: 0})
    const [cursorPosition, setCursorPosition] = useState({top: 0, left: 0, relX: 0, relY: 0})
    const [isClicked, setIsClicked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const imageRef = useRef(null)
    const magnifierRef = useRef(null)

    console.table(cursorPosition)
    const bw = 3
    const zoom = 2

    
    function handleClick(e) {
        setIsClicked(!isClicked)
        const {x, y} =  getCursorPos(e)
        setCursorPosition({top: e.pageY - 50, left: e.pageX - 50, relX: x, relY: y})
    }
    function getCursorPos(e) {
        let a, x = 0, y = 0;
        /* Get the x and y positions of the image: */
        a = imageRef.current.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x, y}
    }
    function handleHover(bool) {
        setIsHovered(bool)
    }
    function handleCursorMove(e) {
        const img = imageRef.current
        const magnifier = magnifierRef.current

        let {x, y} = getCursorPos(e)

        if (img === null || magnifier === null) return backgroundPosition

        const w = magnifier.offsetWidth / 2
        const h = magnifier.offsetHeight / 2
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
        if (x < w / zoom) {x = w / zoom;}
        if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
        if (y < h / zoom) {y = h / zoom;}

        setBackgroundPosition({
            backgroundPosition: "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px"
        })
    }

    return(<Container>
        {isHovered && <Magnifier 
            refference={magnifierRef} 
            position={backgroundPosition} 
            imageRef={imageRef} 
            zoom={zoom}/> }
        {isClicked && <Select top={cursorPosition.top + "px"} left={cursorPosition.left + "px"}/>}     
        <HResImage
            largeImage={largeImage} 
            refference={imageRef} 
            handleMove={handleCursorMove}
            handleClick={handleClick} 
            handleHover={handleHover}/>
          
    </Container>)

}