import React from "react"
import styled from "styled-components"

const Magnifier_ = styled.div`
    position: relative;
    margin-bottom: 10px;
`

export default function Magnifier ({refference, imageRef, zoom, position }) {
    const img = imageRef.current
    const size = (img.width * zoom) + "px " + (img.height * zoom) + "px"

    return (
        <Magnifier_  ref={refference}  
        className="img-magnifier-glass" 
        style={{
            position: "sticky",
            top: "0",
            height: "200px",
            width: "200px",
            backgroundImage: `url("${img.src}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: size,
            border: "2px solid black",
            backgroundPosition: position}}>

        </Magnifier_>)
}