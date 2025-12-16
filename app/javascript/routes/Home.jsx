import React, { useRef, useState } from "react"
import WheresWaldo from "../components/WheresWaldo"
import { useOutletContext } from "react-router-dom"

export default function Home () {
    const { image_large } = useOutletContext()
    return(<WheresWaldo largeImage={image_large}/>)
}