import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = ()=>{
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const Base_URL = "https://todo-backend-gamma.vercel.app"
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const verify = async () => {
        // event.preventDefault();
        try {
            const res = await axios.get(`${Base_URL}/api/dashboard`,{ credentials: "include"})
            console.log("I am inside Home frontend");
            console.log(res);
            if(res.data.success){
                console.log("Welcome to Home")
                setUserName(res.data.name)
                toast.success("LogIn successFully")
                return res.data.name
            }else{
                navigate("/login")
                toast.error("Cannot access to this Page")
                return "";
            }
        } catch (error) {
            navigate("/")
            console.log(error);
        }
    }
    useEffect(()=>{
        verify().then((r)=>{
            console.log(r);
        })
    },[])
    if(!userName){
        return(
            <div>
                Loading.....
            </div>
        )
    }
    // verify()
    return (
        <div className="flex flex-col items-center">
            <div className="text-start p-4 bg-[#FAF8F1] w-[100%]">
                <Link className="text-blue-600 font-bold text-center text-[20px] sm:text-[24px] w-[100%]" to="/dashboard">Click on Dashboard</Link>
            </div>
            <h1 className="text-[40px] pt-100px">Hi, {userName.toUpperCase()} Welcome To Todo App</h1>
            <Toaster/>
        </div>
    )
}