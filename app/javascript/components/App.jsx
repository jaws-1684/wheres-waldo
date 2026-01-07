import React, { createContext, useState } from "react"
import "./App.css"
import { Outlet, useLoaderData } from "react-router-dom"
import Navbar from "./Nav";
import { Container } from "./Container";
import Footer from "./Footer";

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
  
  return (
    <div className="app-wrapper">
        <Navbar/>
        <Container>
          
             <Outlet context={{images}}/>
     
        </Container>
        <Footer/>
    </div>)
}

export default App