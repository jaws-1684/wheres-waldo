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

function App() {
  const { images } = useLoaderData()
  
  return (<>
        <Navbar/>
        
        <Container>
          <Outlet context={{images}}/>
        </Container>
    </>)
}

export default App