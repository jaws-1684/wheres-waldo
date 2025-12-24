import React, { useState } from "react";
import styled from "styled-components";
import { useFetch } from "./App";
import Notice from "./Notice";

const Question = styled.div`
  position: relative;
  border-radius: 10%;
  background: white;
  font-size: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Circle = styled.div`
    width: 70px;
    height: 70px;
    border: 5px dashed red;
    border-radius: 50%;
`

const Button = styled.button.attrs(props => ({
  $background: props.$background || "white",
  $hover: props.$hover || ""
}))`
  background: ${props => props.$background};
  border: none;
  width: 100%;
  border-radius: 5%;
  cursor: pointer;
  &&:hover {
    background: ${props => props.$hover}
  }
`

const Select_s = styled.div.attrs(props => ({
  // we can define static props
  type: "text",
  // or we can define dynamic ones
  $top: props.$top || 0,
  $left: props.$left || 0
}))`
    display: flex;
    gap: 5px;
    position: absolute;
    z-index: 1000;
    top: ${props => props.$top};
    left: ${props => props.$left};
`
export default function Select({handleClick, data, info, setInfo}) {
    const {left, top, image_height, image_width, relX, relY} = data
    const noticeMessages = ["Horray you found Waldo!", "OOops no Waldo here!"]
    async function handleButtonClick () {
     
      const response = await useFetch(`/validate?width=${image_width}&&height=${image_height}&&top=${relY}&&left=${relX}`)
      if (response.target_valid != info.lastResponse) {
        setInfo(info => ({...info,
        noticeActive: true,
        noticeContent: response.target_valid ? noticeMessages[0] : noticeMessages[1],
        isClicked: false,
        lastResponse: response
      }))
      }
    }

    return <>
      
      <Select_s $left={left + "px"} $top={top + "px"}>
          <Circle/>
          <Question>
            <p>Is Waldo Here ?</p>
            <div className="btn-container">
              <Button onClick={() => handleButtonClick()} $hover={"lightgreen"} $background={"green"}>Click me</Button>
            </div>
          </Question>
      </Select_s>
    </>
    
}