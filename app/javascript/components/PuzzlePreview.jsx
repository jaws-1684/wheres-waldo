import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const PuzzlePreview_s = styled.div`
    max-width: 20vw;
    display: flex;
    flex-direction: column;
    padding: 0 20px 0 20px;
    border-radius: 20px;
    background: #1D546D;
    @media (width <= 800px) {
        && {
            max-width: 80vw;
        }
    }
} 
`
export default function PuzzlePreview({image, id, title}) {
    return <PuzzlePreview_s>
            <h2>{title}</h2>
            <img src={image}></img>
            <Link className="play-link" to={`/games/${id}`}>Play</Link>
        </PuzzlePreview_s>
        
} 