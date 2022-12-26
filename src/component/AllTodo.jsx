import axios from "axios";
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useState } from "react";
import { EditTodo } from "./EditTodo";
import rightArrow from "../rightArrow.png"

export const AllTodo = () => {
    const [isShown, setIsShown] = useState(true);
    const [todo,setTodo] = useState([])
    const [todoTitle, setTodoTitle] = useState("")
    const [taskTitle, setTaskTitle] = useState("")
    const [isLoading, setLoading] = useState(true)
    const serverUrl = "http://localhost:4000"
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
            setTodo(await getAll());
        }
    }
    const editClicked = async(id)=>{
        console.log("inside me");
        const title = todoTitle
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
    const createTask = async (todoId, taskId) => {
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
        const taskName = taskTitle
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
    return (
        <div>
            <form onSubmit={onSubmit} action="" key={todo[0]._id} className="flex flex-row text-[25px] justify-center">
                <input className="" type="text" key={todo[0]._id} placeholder="Enter New Todo" onChange={(e)=>{setTodoTitle(e.target.value)}} />
                <button onClick={()=>{createTodo()}}>Save</button>
            </form>
            {todo && todo.map((item,index)=>{
                return (
                    <div className="flex flex-col justify-between">
                        <div key={item._id} className="flex flex-row text-[25px] justify-center w-1/2">
                            <input className="" type="text" key={item._id} defaultValue={item.title} onChange={(e)=>{setTodoTitle(e.target.value)}} />
                            <button onClick={()=>{editClicked(item._id)}} className="mr-[10px]">Save</button>
                            <button onClick={()=>{deleteClicked(item._id)}} className="">Delete</button>
                            <button onClick={handleClick} ><img src={rightArrow} alt="" /></button>
                        </div>
                        <div className="flex flex-col">
                            <form onSubmit={onSubmit} action="" key={item._id} className="flex flex-row text-[25px] justify-center">
                                <input className="" type="text" key={item._id} placeholder="Enter New Task" onChange={(e)=>{setTaskTitle(e.target.value)}} />
                                <button onClick={()=>{createTask(item._id)}}>Save</button>
                            </form>
                        {item.tasks && item.tasks.map((ele,index)=>{
                            return (
                                <div key={ele._id} className={isShown ? 'display-block flex flex-row text-[25px]  justify-center' : 'hidden'}>
                                    <input key={ele._id} defaultValue={ele.taskName} onChange={(e)=>{setTaskTitle(e.target.value)}} type="text" />
                                    <button onClick={()=>{editTask(item._id, ele._id)}} className="mr-[10px]">Save</button>
                                    <button onClick={()=>{deleteTask(item._id, ele._id)}}>Delete</button>
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
