import axios from "axios";
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const Home = async ()=>{
    const res = await axios.get("/api/dashboard",{
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
    const navigate = useNavigate();
    console.log(res);
    if(res.data.success){
        toast("Welcome to Home")
    }else{
        navigate("/login")
        toast("Cannot access to this Page")
        return;
    }
    return (
        <div>
            <h1 className="text-blue-600">Welcome to Todo App</h1>
            <p>Dashboard</p>
            <Toaster/>
        </div>
    )
}