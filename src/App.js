import React from "react";
// import { BrowserRouter, Routes, route} from "react-router-dom"
import { Home } from "./pages/Home"
import { SignUp } from "./component/SignUp";
import { LogIn } from "./component/LogIn";
import { Route, Routes} from "react-router-dom";

export function App(){
    return(
        <>
        <Routes>
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/" element={<SignUp/>} />
            <Route exact path="/login" element={<LogIn/>} />
        </Routes>
        {/* <SignUp/> */}
        </>
    )
}