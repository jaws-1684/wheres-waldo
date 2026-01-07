import React from "react";
import { useOutletContext } from "react-router-dom";
import { Container } from "../components/Container";
import PuzzlePreview from "../components/PuzzlePreview";



export default function Home() {
    const { images } = useOutletContext()

    return <div className="home">
        <h1 className="home-title">Puzzles</h1>
       {images.map(img => <PuzzlePreview key={img.id} title={img.title} id={img.id} image={img.url}/>)}
    </div>
     
    
    
}