import React, { useState } from "react";
import { MdLabelImportantOutline } from "react-icons/md";
import { MdLabelImportant } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const Cards = ({ home, setInputDiv ,data,setEdited}) => {
    const headers= {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
    const handleComplete = async(id, completed)=>{ 
        try {
            await axios.put(`http://localhost:8080/api/v1/tasks/${id}` , {completed:!completed},{headers})
            
        } catch (error) {
            console.log(error);
        }
    }
    const makeImportant = async(id,important)=>{ 
        try {
            await axios.put(`http://localhost:8080/api/v1/tasks/${id}` , {important:!important},{headers})
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleDelete = async(id)=>{
        try {
           const response = await axios.delete(`http://localhost:8080/api/v1/tasks/${id}`,{headers});
            console.log(response.data.message)
        } catch (error) {
            console.log(error);
            
        }
    }
    const handleEdit = (id , title, description)=>{
        setInputDiv("fixed")
        setEdited({id:id,title:title ,description:description})
    }
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {data &&
                data.map((items, i) => (
                    <div key={i} className="flex flex-col justify-between bg-gray-200 dark:bg-zinc-700 rounded p-4">
                        <div>
                            <h3 className="text-xl font-bold dark:text-gray-100">{items.title}</h3>
                            <p className="text-base text-gray-900 dark:text-gray-300 my-2">{items.description}</p>
                        </div>
                        <div className="mt-4 w-full">
                            <div className="flex justify-center mb-4">
                                <button className={`${
                                    items.completed === false ? "bg-red-500" : "bg-green-500"
                                } w-4/5 p-2 rounded text-l font-bold dark:text-gray-100`} onClick={()=>handleComplete(items._id,items.completed)}>
                                  
                                    {items.completed===true?"Completed":"Incomplete"} 
                                </button>
                            </div>

                            <div className="mt-3 ml-1 mb-0 w-full flex justify-around text-2xl font-semibold text-gray-900 dark:text-gray-300">
                                <button onClick={()=>makeImportant(items._id,items.important)}> {items.important? <MdLabelImportant className="text-green-500 hover:scale-125 transition-all duration-300 " />:<MdLabelImportantOutline className="hover:scale-125 transition-all duration-300 hover:text-green-500" />} </button>
                                <button onClick={()=>handleEdit(items._id,items.title,items.description)}> <FaRegEdit className="hover:scale-125 transition-all duration-300 hover:text-green-500" /> </button>
                                <button onClick={()=>handleDelete(items._id)}> <MdDeleteOutline className="hover:scale-125 transition-all duration-300 hover:text-red-500" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            {home === "true" && (
                <button
                    className="flex justify-center items-center bg-gray-200 dark:bg-zinc-700 rounded p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300 text-gray-900 dark:text-gray-100"
                    onClick={() => setInputDiv("fixed")}
                >
                    <span className="text-2xl mr-2">
                        <IoIosAddCircleOutline />
                    </span>
                    <h2 className="text-xl">Add a Task</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;
