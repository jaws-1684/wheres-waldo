import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Navigation = styled.nav`
    min-height: 5vh;
    widht: 100vw;
    font-size: clamp(6px, 18px, 24px);
    font-weight: bold;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 10px;
`
export default function Navbar() {
    return (<Navigation>
            <h2 className="title">Where's<span>Waldo</span></h2>
            
            <div className="nav-data">
                <Link to={"/"}>Home</Link>
                <Link to="/dashboard">Leader board</Link>        
            </div>
        </Navigation>)
}