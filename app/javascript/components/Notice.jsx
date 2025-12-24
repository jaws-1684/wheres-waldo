import React from "react";
import styled from "styled-components";

const Notice_ = styled.div`
    position: absolute;
    top: 80px;
    left: 10vw;
    margin: 0 auto;
    width: 75%;
    padding: 5px;
    background: lightgreen;
    color: green;
    z-index: 5000;
    border-radius: 5px;
`
export default function Notice ({children}) {
    return <Notice_ className="notice">{children}</Notice_>
}