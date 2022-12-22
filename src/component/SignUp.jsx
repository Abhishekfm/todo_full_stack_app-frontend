import axios from "axios";
import React, {useState} from "react";
import { toast } from "react-hot-toast";

export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try{
            if(!name || !email || !password){
                toast.error("Provide all Details")
                return
            }

            if(password.length < 8){
                toast.error("Password must be less than")
                return
            }

            const res = await axios.post("http://localhost:4000/api/createUser",{
                name,
                email,
                password
            })

            if(!res){
                toast.error("Wrong Route")
                return;
            }

            if(res.data.success){
                toast.success("Successfully created a account")
            }

        } catch(err){
            console.log(err);
        }
    }
    return (
        <div className="w-full h-[600px] flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex w-[300px] h-full flex-col justify-center gap-2">
                <div className="text-center">
                    <h2 className="font-semibold text-lg" >Sign Up</h2>
                </div>
                <input type="text" onChange={(e)=>setName(e.target.value)} className="pl-[4px] rounded-md border-2 border-slate-400 shadow-black" placeholder="Enter Your Name" name="" id="" />
                <input type="email" onChange={(e)=>setEmail(e.target.value)} className="pl-[4px] rounded-md border-2 border-slate-400 shadow-black" placeholder="Enter Your Email" />
                <input type="password" onChange={(e)=>setPassword(e.target.value)} className="pl-[4px] rounded-md border-2 border-slate-400 shadow-black" placeholder="Enter Your Password" name="" id="" />
                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">SignUp</button>
            </form>
        </div>
    )
}