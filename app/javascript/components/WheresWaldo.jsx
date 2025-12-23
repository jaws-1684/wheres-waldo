import React, { use, useContext, useRef, useState } from "react"
import Magnifier from "./Magnifier"
import HResImage from "./HResImage"
import Select from "./Select"
import { MagnifierContext } from "./App"
import { Container } from "./Container"
import Notice from "./Notice"

const WALDO_POSITIONS = [
    {top: 59, left: 30}
]
function NumberBetween(number, a, b) {
  let min = Math.min(a, b),
    max = Math.max(a, b);
  return number > min && number < max;
};

const checkPosition = ({image_width, image_height, x, y}) => {
    const radiusPercent = (35 * 100) / image_width
    let aproximate_percentge_pos_X = (x * 100) / image_width
    let aproximate_percentge_pos_Y = (y * 100) / image_height

    const bounds = {
        UPPER_X: aproximate_percentge_pos_X + radiusPercent,
        LOWER_X: aproximate_percentge_pos_X - radiusPercent,
        UPPER_Y: aproximate_percentge_pos_Y + radiusPercent,
        LOWER_Y: aproximate_percentge_pos_Y - radiusPercent,
    }
    const found = WALDO_POSITIONS.some((obj => {
        return (NumberBetween(obj.top, bounds.LOWER_X, bounds.UPPER_X) && NumberBetween(obj.left, bounds.LOWER_Y, bounds.UPPER_Y))
    }))
    if (found)  {
        return true
    }
    return false
}
export default function WheresWaldo({largeImage}) {
    const [data, setData] = useState({top: 0, left: 0, relX: 0, relY: 0, backgroundPosition: 0})
    const [info, setInfo] = useState({
        isClicked: false,
        isHovered: false,
        notice: false,
    })
    const { magnifierActivated } = useContext(MagnifierContext)
    const imageRef = useRef(null)
    const magnifierRef = useRef(null)

    
    const bw = 3
    const zoom = 2

    
    function handleClick(e) {
        const {x, y} =  getCursorPos(e)
        setData((data) => ({...data, top: e.pageY - 35, left: e.pageX - 35, relX: x, relY: y}))
        let image_height = imageRef.current.height
        let image_width = imageRef.current.width
        let notice = checkPosition({image_width, image_height, x, y})
        setInfo((info) => ({...info, isClicked: !info.isClicked, notice: notice}))
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
        setInfo({...info, isHovered: bool})
    }
    function handleCursorMove(e) {
        const img = imageRef.current
        const magnifier = magnifierRef.current

        let {x, y} = getCursorPos(e)

        if (img === null || magnifier === null) return data.backgroundPosition

        const w = magnifier.offsetWidth / 2
        const h = magnifier.offsetHeight / 2
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
        if (x < w / zoom) {x = w / zoom;}
        if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
        if (y < h / zoom) {y = h / zoom;}

        const position = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px"
        setData((data) => ({...data, backgroundPosition: position}))
    }

    return(<>
        {info.notice && <Notice>You found one Waldo</Notice>}
        {magnifierActivated && <Magnifier 
            refference={magnifierRef} 
            position={data.backgroundPosition} 
            imageRef={imageRef} 
            zoom={zoom}/> }
        {info.isClicked && <Select top={data.top + "px"} left={data.left + "px"}/>}     
        <HResImage
            largeImage={largeImage} 
            refference={imageRef} 
            handleMove={handleCursorMove}
            handleClick={handleClick} 
            handleHover={handleHover}/>
          
    </>)

}