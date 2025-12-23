import React from "react";
import styled from "styled-components";

const Notice_ = styled.div`
    position: fixed;
    top: 10px;
    width: 20vh;
`
export default function Notice ({children}) {
    return <Notice_>{children}</Notice_>
}