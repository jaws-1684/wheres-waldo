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
  return await useFetch(`/images`)
}

export const WaldosContext = createContext({count: 0})

function App(props) {
  const { images } = useLoaderData()
  const image_large = images[0].url
  const waldos = images[0].waldos
  const [waldosIdentified, setWaldosIdentified] = useState({total: waldos, count: 0, positions: []})
  return (<>
        <Navbar/>
         <WaldosContext value={{waldosIdentified, setWaldosIdentified}}>
            <Container>
              <Outlet context={{image_large}}/>
            </Container>
        </WaldosContext>  
    </>)
}

export default App