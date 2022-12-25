import axios from "axios";
import React from "react";
// import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const Home = ()=>{
    const navigate = useNavigate();
    const verify = async () => {
        // event.preventDefault();
        const res = await axios.get("http://localhost:4000/api/dashboard",{
        withCredentials: true
        })
        console.log("I am inside Home frontend");
        console.log(res);
        if(res.data.success){
            console.log("Welcome to Home")
            toast.success("LogIn successFully")
        }else{
            navigate("/login")
            toast.error("Cannot access to this Page")
            return;
        }
    }
    // useEffect(()=>{
    //     verify()
    // },[])
    verify()
    return (
        <div>
            <h1 className="text-blue-600">Welcome to Todo App</h1>
            <p>Dashboard</p>
            <Toaster/>
        </div>
    )
}