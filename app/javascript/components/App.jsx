import React from "react"
import "./App.css"
import { Outlet, useLoaderData } from "react-router-dom"
import Navbar from "./Nav";

export async function hightResImageLoader() {
  try {
    const response = await fetch("http://127.0.0.1:3000/images/2");
    if (!response.ok) {
      throw new Response("Image not found", { status: 404 }); // Custom error
    }
    return await response.json();
  } catch (err) {
    throw new Response("Server error", { status: 500 }); // Network failure
  }
}
function App(props) {
   const { image_large } = useLoaderData()
  return (<>
        <Navbar/>
        <Outlet context={{image_large}}/>
    </>)
}

export default App