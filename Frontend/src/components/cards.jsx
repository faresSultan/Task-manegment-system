import React, { useState } from "react";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

const Cards = ({ home, InputDiv, setInputDiv }) => {

    const data = [
        {
            title: "Final project",
            discription: "Dont forget to finish the project before the deadline :(",
            status: "In progress",
        },
        {
            title: "React task maneger",
            discription: "The project is a task maneger to manege ur tasks",
            status: "In progress",
        },
        {
            title: "Random Task",
            discription: "Hi how are U :)",
            status: "Done",
        },
    ];
    const [TaskStatus, setTaskStatus] = useState("In progress");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {data &&
                data.map((items, i) => (
                    <div key={i} className="flex flex-col justify-between bg-gray-200 dark:bg-zinc-700 rounded p-4">
                        <div>
                            <h3 className="text-xl font-bold dark:text-gray-100">{items.title}</h3>
                            <p className="text-base text-gray-900 dark:text-gray-300 my-2">{items.discription}</p>
                        </div>
                        <div className="mt-4 w-full">
                            <div className="flex justify-center mb-4">
                                <button className={`${
                                    items.status === "In progress" ? "bg-orange-500" : "bg-green-500"
                                } w-4/5 p-2 rounded text-l font-bold dark:text-gray-100`}>
                                    {items.status}
                                </button>
                            </div>

                            <div className="mt-3 ml-1 mb-0 w-full flex justify-around text-xl font-semibold text-gray-900 dark:text-gray-300">
                                <button> <MdLabelImportantOutline className="hover:scale-125 transition-all duration-300" /> </button>
                                <button> <FaRegEdit className="hover:scale-125 transition-all duration-300" /> </button>
                                <button> <MdDeleteOutline className="hover:scale-125 transition-all duration-300" /></button>
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
