import axios from "axios";
import React, {useState} from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try{
            event.preventDefault()
            if(!name || !email || !password){
                toast.error("Provide all Details")
                return
            }

            if(password.length < 8){
                toast.error("Password must be less than")
                return
            }

            const res = await axios.post("https://todo-backend-gamma.vercel.app/api/createUser",{
                name: name,
                email: email,
                password: password
            },{ credentials: "include"})

            if(!res){
                toast.error("Wrong Route")
                return;
            }

            if(res.data.success){
                setName("")
                setEmail("")
                setPassword("")
                navigate("/home")
                toast.success("Successfully created a account")
                return
            }

        } catch(err){
            console.log(err);
        }
    }
    return (
        <>
        <div className="text-blue-600 font-bold text-center text-[24px] w-[100%]">
        <Link to="/home">TODO APP</Link>
        </div>
        <div className="w-full h-[600px] flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="flex w-[300px] h-full flex-col justify-center gap-2">
                <div className="text-center">
                    <h2 className="font-semibold text-lg" >Sign Up</h2>
                </div>
                <input type="text" onChange={(e)=>setName(e.target.value)} className="pl-[4px] rounded-md border-2 border-slate-400 shadow-black" placeholder="Enter Your Name" name="" />
                <input type="email" onChange={(e)=>setEmail(e.target.value)} className="pl-[4px] rounded-md border-2 border-slate-400 shadow-black" placeholder="Enter Your Email" />
                <input type="password" onChange={(e)=>setPassword(e.target.value)} className="pl-[4px] rounded-md border-2 border-slate-400 shadow-black" placeholder="Enter Your Password" name="" />
                <button className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">SignUp</button>
            </form>
            <Link to="/login">Already A User? Click To Log In</Link>
            <Toaster />
        </div>
        </>
    )
}