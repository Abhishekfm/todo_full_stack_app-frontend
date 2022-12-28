import axios from "axios";
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useState } from "react";
import { EditTodo } from "./EditTodo";
import rightArrow from "../rightArrow.png"
import logout from "../logout.png"
import { useNavigate } from "react-router-dom";

export const AllTodo = () => {
    const [isShown, setIsShown] = useState(false)
    const [todo,setTodo] = useState([])
    const [todoTitle, setTodoTitle] = useState("")
    const [todoTitleIn, setTodoTitleIn] = useState("")
    const [searchText, setSearch] = useState("")
    const [taskTitle, setTaskTitle] = useState("")
    const [taskTitleIn, setTaskTitleIn] = useState("")
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate();
    // const serverUrl = "http://localhost:4000"
    const serverUrl = "https://todo-backend-gamma.vercel.app"
    console.log(serverUrl);
    const getAll = async() => {
        try {
            const res = await axios.get(`${serverUrl}/u/todo`,{
                withCredentials: true
            })
            if(!res){
                toast.error("Wrong Route")
                return
            } else {
                console.log(res);
                setTodo(res.data.allTodos)
                return res.data.allTodos;
            }
        } catch (error) {
            console.log(error);
            return
        }

    }
    useEffect(() => {
        getAll().then(response => {
            setTodo(response)
            setLoading(false)
        })
    },[])

    if(isLoading){
        return (
            <h1>Loading</h1>
        )
    }
    let taskList;
    let clicked = false;
    // For Task
    const onSubmit = (event) =>{
        event.preventDefault()
    }
    const createTodo = async () => {
        const title = todoTitle
        if(!title){
            toast.error("Title cannot be Empty")
            return
        }
        const res = await axios.post(`${serverUrl}/u/todo`,{
            title
        },{withCredentials: true})
        if(!res){
            toast.error("Wrong Route")
            return
        } else {
            setTodoTitle("")
            setTodo(await getAll());
        }
    }
    const editClicked = async(id)=>{
        console.log("inside me");
        const title = todoTitleIn
        if(!title){
            toast.error("Empty title")
            return
        }
        const res  = await axios.post(`${serverUrl}/u/todo/edit/${id}`,{
            title
        }, { withCredentials: true })
        if(!res){
            return
        } else{
            console.log(res);
            setTodo(await getAll());
        }
    }
    const deleteClicked = async(id)=>{
        console.log("inside me");
        const res  = await axios.delete(`${serverUrl}/u/todo/delete/${id}`, { withCredentials: true })
        if(!res){
            return
        } else{
            console.log(res);
            setTodo(await getAll())
        }
    }
    const handleClick = event => {
        setIsShown(current => !current)
    }
    const createTask = async (todoId) => {
        const taskName = taskTitle
        if(!taskName){
            toast.error("Task Title cannot be Empty")
            return
        }
        const res = await axios.post(`${serverUrl}/u/todo/task/${todoId}`,{
            taskName
        },{ withCredentials: true})
        if(!res){
            toast.error("Wrong Route")
            return
        }else{
            setTaskTitle("")
            setTodo(await getAll())
        }
    }
    const editTask = async (todoId, taskId)=>{
        // if(editTaskClicked === "Edit"){
        //     edit
        // }
        const taskName = taskTitleIn
        if(!taskName){
            toast.error("Task Title cannot be Empty")
            return
        }
        const res = await axios.post(`${serverUrl}/u/todo/task/${todoId}/${taskId}`,{
            taskName
        },{ withCredentials: true})
        if(!res){
            toast.error("Wrong Route")
            return
        }else{
            setTodo(await getAll())
        }

    }
    const deleteTask = async (todoId, taskId)=>{
        const res = await axios.delete(`${serverUrl}/u/todo/task/${todoId}/${taskId}`,{ withCredentials: true})
        if(!res){
            toast.error("Wrong Route")
            return
        }else{
            setTodo(await getAll())
        }
    }
    const sortByCreation = async () => {
        try {
            const res = await axios.get(`${serverUrl}/u/todo/sort`,{ withCredentials: true})
            if(!res){
                toast.error("Wrong Route")
                return
            }else{
                setTodo(res.data.sortedTodosAtCreation)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const sortByUpdation = async () => {
        try {
            const res = await axios.get(`${serverUrl}/u/todo/sort`,{ withCredentials: true})
            if(!res){
                toast.error("Wrong Route")
                return
            }else{
                setTodo(res.data.sortedTodosAtUpdation)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const searchHere = async () => {
        try {
            console.log(searchText);
            if(!searchText){
                toast.error("Search Text Cannot be Empty")
                setTodo(await getAll())
                return
            }
            const res = await axios.post(`${serverUrl}/u/todo/search`,{
                searchText
            },{ withCredentials: true})
            if(!res){
                toast.error("Wrong Route")
                return
            }else{
                if(res.data.result.length === 0){
                    toast.error("No Result Found")
                    return
                }
                console.log(res.data.result);
                setTodo(res.data.result)
            }
        }catch(e){
            console.log(e);
        }
    }
    const logMeOut = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/logout`,{withCredentials:true})
            if(!res){
                toast.error("Wrong Path")
                return
            } else{
                toast.success("Successfully Logout")
                navigate("/")
                return;
            }
        } catch (error) {
            navigate('/');
            console.log(error);
        }
    }
    const TodoDone = async (todoId, taskId, val) => {
        try {
            const res = await axios.post(`${serverUrl}/u/todo/task/done/${todoId}/${taskId}`,{
                done:val
            },{withCredentials:true})
            if(!res){
                toast.error("Wrong Route")
                return
            } else{
                if(val){
                    toast('Good Job!', {
                        icon: '👏',
                    });
                }else{
                    toast('Still Pending!', {
                        icon: '😤',
                    });
                }
                console.log(res);
                return
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex flex-col bg-[#FAF8F1]">
            <div className="flex flex-col-reverse md:flex-row justify-around bg-[#E5BA73] p-[15px] gap-2 fixed w-[100%]">
                <div className="flex gap-2">
                    <input className="pl-2 text-[20px] md:text-[24px] w-full rounded" type="text" placeholder="Search here...." onChange={(e)=>{setSearch(e.target.value)}} />
                    <button onClick={()=>{searchHere()}} className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Search</button>
                </div>
                <button onClick={()=>{sortByCreation()}} className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">By Creation</button>
                <button onClick={()=>{sortByUpdation()}} className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">By Updation</button>
                <button className="flex margin-auto items-center text-[15px] md:text-[18px] justify-end  font-semibold" onClick={()=>{logMeOut()}}>Logout<img src={logout} className="w-[18px] md:w-[24px]" alt="" /></button>
            </div>
            <div className="h-[200px] lg:h-[100px]"></div>
            <div className="flex flex-col md:flex-row m-8 gap-8 justify-center">
                <h1 className="underline decoration-[#E5BA73] font-bold italic text-[24px]">TODOS</h1>
                <form onSubmit={onSubmit} action="" className="justify-self-center gap-2 flex flex-row text-[18px] sm:text-[20px] ">
                    <input className="pl-2 w-full border-2 border-black rounded" type="text" placeholder="Create New Todo" value={todoTitle} onChange={(e)=>{setTodoTitle(e.target.value)}} />
                    <div>
                        <button className="bg-transparent text-[20px] hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" onClick={()=>{createTodo()}}>Save</button>
                    </div>
                </form>
                
            </div>
            {todo && todo.map((item,index)=>{
                return (
                    <div className={isShown ? "flex flex-col md:flex-row shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  p-4 m-4 justify-around" : "flex flex-row p-4 m-4 justify-around border-b-2 border-gray "}>
                        <div key={item._id} className="flex flex-row text-[18px] sm:text-[22px] border-b-4 md:border-b-0 md:border-r-4 border-gray justify-center">
                            <div className="">
                                <input className="bg-[#FAF8F1] margin-x-auto px-2 w-full" type="text" key={item._id} defaultValue={item.title} onChange={(e)=>{setTodoTitleIn(e.target.value)}} />
                            </div>
                            <div>
                                <button onClick={()=>{editClicked(item._id)}} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-1 py-1 md:px-5 md:py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mr-[10px] font-semibold decoration-[#E5BA73] ">Save</button>
                            </div>
                            <div>
                                <button onClick={()=>{deleteClicked(item._id)}} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-1 py-1 md:px-5 md:py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-semibold decoration-[#E5BA73] ">Delete</button>
                            </div>
                            <div>
                                <button onClick={handleClick} ><img src={rightArrow} alt="" /></button>
                            </div>
                        </div>
                        <div  className={isShown ? 'display-block flex flex-col text-[20px] gap-2 justify-center' : 'hidden'}>
                            <h1 className="underline decoration-[#E5BA73] font-bold italic text-[20px] sm:text-[24px]">TASKS</h1>
                            <form onSubmit={onSubmit} action="" key={item._id} className="flex flex-row text-[17px] sm:text-[20px] justify-center">
                                <input className="pl-2 border-2 w-full border-black rounded mr-2" type="text" key={item._id} placeholder="Create New Task" onChange={(e)=>{setTaskTitle(e.target.value)}} />
                                <button className="bg-transparent text-[20px] hover:bg-black text-black font-semibold hover:text-white px-2 py-1 sm:py-2 sm:px-4 border border-black hover:border-transparent rounded" onClick={()=>{createTask(item._id)}}>Save</button>
                            </form>
                        {item.tasks && item.tasks.map((ele,index)=>{
                            return (
                                <div key={ele._id} className={isShown ? 'display-block items-center flex flex-row text-[15px] sm:text-[20px] gap-2 items-center justify-center' : 'hidden'}>
                                    <div>
                                        <input className="w-4 h-4 focus:ring-blue-500 border-0 rounded" type="checkbox" defaultChecked={ele.done} onClick={(event)=>{TodoDone(item._id, ele._id, event.target.checked)}} />
                                    </div>
                                    <input className="bg-[#FAF8F1] px-2 w-full" key={ele._id} defaultValue={ele.taskName} onChange={(e)=>{setTaskTitleIn(e.target.value)}} type="text" />
                                    <button onClick={()=>{editTask(item._id, ele._id)}} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-1 py-1 md:px-5 md:py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mr-[10px] font-semibold decoration-[#E5BA73] ">Save</button>
                                    <button onClick={()=>{deleteTask(item._id, ele._id)}} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-1 py-1 md:px-5 md:py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mr-[10px] font-semibold decoration-[#E5BA73] ">Delete</button>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    

                )
            })}
            <Toaster/>
        </div>
    )
    // return (
    //     <>
    //     <ul>
    //         {itemList}
    //         {taskList}
    //     </ul>
    //     { clicked ? taskList : null }
    //     <Toaster />
    //     </>
    // )
}
