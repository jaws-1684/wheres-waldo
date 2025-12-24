import React, { useEffect, useContext, useRef, useState } from "react"
import Magnifier from "./Magnifier"
import HResImage from "./HResImage"
import Select from "./Select"
import { MagnifierContext } from "./App"
import Notice from "./Notice"


export default function WheresWaldo({largeImage}) {
    const [data, setData] = useState({top: 0, 
        left: 0, 
        relX: 0, 
        relY: 0, 
        backgroundPosition: 0,
        image_width: 0,
        image_height: 0
    })
    const [info, setInfo] = useState({
        isClicked: false,
        isHovered: false,
        lastResponse: null,
        noticeActive: false,
        noticeContent: ""
    })

    const { magnifierActivated } = useContext(MagnifierContext)
    const imageRef = useRef(null)
    const magnifierRef = useRef(null)
    const bw = 3
    const zoom = 2

     useEffect(() => {
          const key = setInterval(() => {
            if (info.noticeActive) {
              setInfo(info => ({...info, noticeActive: false}))
            }
          }, 2000);
          return () => {
            clearInterval(key);
        } ;
        }, [info.noticeActive])

    async function handleClick(e) {
        const {x, y} =  getCursorPos(e)
        const image_h = imageRef.current.height
        const image_w = imageRef.current.width

        setData((data) => ({...data, 
            top: e.pageY - 35, 
            left: e.pageX - 35, 
            relX: x, 
            relY: y,
            image_height: image_h,
            image_width: image_w
        }))
        setInfo((info) => ({...info, isClicked: true}))
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
        if (bool != info.isHovered) {
             setInfo({...info, isHovered: bool})
        }
    }
    function handleCursorMove(e) {
        if (!magnifierActivated) return
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
        {info.noticeActive && <Notice>{info.noticeContent}</Notice>}
        {magnifierActivated && <Magnifier 
            refference={magnifierRef} 
            position={data.backgroundPosition} 
            imageRef={imageRef} 
            zoom={zoom}/> }
        {info.isClicked && <Select 
                info={info}
                setInfo={setInfo} 
                data={data}
            />}     
        <HResImage
            largeImage={largeImage} 
            refference={imageRef} 
            handleMove={handleCursorMove}
            handleClick={handleClick} 
            handleHover={handleHover}/>
          
    </>)

}