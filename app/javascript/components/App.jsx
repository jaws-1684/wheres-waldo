import React, { createContext, useState } from "react"
import "./App.css"
import { Outlet, useLoaderData } from "react-router-dom"
import Navbar from "./Nav";
import { Container } from "./Container";

export async function useFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Response("Not found", { status: 404 }); // Custom error
    }
    return await response.json();
  } catch (err) {
    throw new Response("Server error", { status: 500 }); // Network failure
  }
}
export async function hightResImageLoader() {
  return await useFetch("/images/2")
}
export const MagnifierContext = createContext(null)

function App(props) {
  const { image_large } = useLoaderData()
  const [magnifierActivated, setMagnifierActivated] = useState(false)
  const handleClick = () => setMagnifierActivated(!magnifierActivated)
  return (<>
        <Navbar/>
        <MagnifierContext value={{magnifierActivated}}>
          <Container>
            <div>
              <button style={{width: "fit-content"}} onClick={() => handleClick()}>Magnifier</button>
            </div>
            <Outlet context={{image_large}}/>
          </Container>
        </MagnifierContext>
    </>)
}

export default App