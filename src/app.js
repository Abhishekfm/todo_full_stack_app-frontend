import React, { useState } from "react";
import { BrowserRouter, Routes, route} from "react-router-dom"
import { Home } from "./pages/home"

export function App(){
    return(
        <>
        <Home/>
        </>
    )
}