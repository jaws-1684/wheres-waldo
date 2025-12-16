import React from "react"
import styled from "styled-components"

const Img = styled.img`
    width: 100vw;
`

export default function HResImage({largeImage, handleClick, refference, handleHover, handleMove}) {
    return(<Img 
        onMouseMove ={e => handleMove(e)}
        onMouseEnter ={() => handleHover(true)}
        onClick={e => handleClick(e)} 
        id="waldo-1" 
        className="main-image"
        ref={refference} 
        src={largeImage}/>)
}