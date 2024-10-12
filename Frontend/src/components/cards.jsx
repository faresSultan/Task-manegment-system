import React, { useState } from "react";
import { MdLabelImportantOutline } from "react-icons/md";
import { MdLabelImportant } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setEdited }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleComplete = async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/tasks/${id}`,
        { completed: !completed },
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const makeImportant = async (id, important) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/tasks/${id}`,
        { important: !important },
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/tasks/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, title, description) => {
    setInputDiv("fixed");
    setEdited({ id: id, title: title, description: description });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-100 dark:bg-zinc-700 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {items.title}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                {items.description}
              </p>
            </div>
            <div className="w-full">
              <div className="flex justify-center mb-4">
                <button
                  className={`${
                    items.completed === false ? "bg-yellow-500" : "bg-green-500"
                  } w-full py-2 rounded-md font-bold text-white shadow-md hover:opacity-90 transition-opacity duration-300`}
                  onClick={() => handleComplete(items._id, items.completed)}
                >
                  {items.completed === true ? (
                    <>
                      <span className="mr-2">✔</span> Completed
                    </>
                  ) : (
                    <>
                      <span className="mr-2">⏳</span> In Progress
                    </>
                  )}
                </button>
              </div>

              <div className="w-full flex justify-around text-2xl font-semibold text-gray-900 dark:text-gray-300">
                <button
                  onClick={() => makeImportant(items._id, items.important)}
                  aria-label="Mark as Important"
                  className="hover:scale-125 transition-all duration-300"
                >
                  {items.important ? (
                    <MdLabelImportant className="text-green-500" />
                  ) : (
                    <MdLabelImportantOutline className="hover:text-green-500" />
                  )}
                </button>
                <button
                  onClick={() =>
                    handleEdit(items._id, items.title, items.description)
                  }
                  aria-label="Edit Task"
                  className="hover:scale-125 transition-all duration-300"
                >
                  <FaRegEdit className="hover:text-green-500" />
                </button>
                <button
                  onClick={() => handleDelete(items._id)}
                  aria-label="Delete Task"
                  className="hover:scale-125 transition-all duration-300"
                >
                  <MdDeleteOutline className="hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex justify-center items-center bg-gray-200 dark:bg-zinc-700 rounded-lg p-6 shadow-lg hover:scale-105 hover:cursor-pointer transition-transform duration-300 text-gray-900 dark:text-gray-100"
          onClick={() => setInputDiv("fixed")}
        >
          <IoIosAddCircleOutline className="text-3xl mr-2" />
          <h2 className="text-xl font-bold">Add a Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
