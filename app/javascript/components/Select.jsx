import React from "react";
import styled from "styled-components";

const CircleDashed = styled.div.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  $top: props.$top || 0,
  $left: props.$left || 0
}))`
    width: 70px;
    height: 70px;
    border: 5px dashed red;
    border-radius: 50%;
    position: absolute;
    z-index: 1000;
    top: ${props => props.$top};
    left: ${props => props.$left};
`
export default function Select({top, left}) {
    return <CircleDashed $left={left} $top={top}/>
}