import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Data from "./Data"
import Counter from "./Counter"

const Navigation = styled.nav`
    min-height: 5vh;
    widht: 100vw;
    font-size: clamp(6px, 18px, 24px);
    color: blue;
    font-weight: bold;
    background-color: lightblue;
    display: flex;
    justify-content: start;
    padding: 10px;
`
export default function Navbar() {
    return (<Navigation>
        <div className="nav-data">
            <h2 className="title">Where's Waldo</h2>
            <Link><h2>Leader board</h2></Link>
            <Data>
                <div>
                    <p>Your Score:</p>
                    <Counter/>
                </div>
            </Data>
        </div>
        
        </Navigation>)
}