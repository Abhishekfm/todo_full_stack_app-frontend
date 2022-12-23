import React, { useState } from "react";
// import { BrowserRouter, Routes, route} from "react-router-dom"
import { Home } from "./pages/Home"
import { SignUp } from "./component/SignUp";
import { Route, Switch } from "react-router-dom";

export function App(){
    return(
        <>
        <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={SignUp} />
        </Switch>
        {/* <SignUp/> */}
        </>
    )
}