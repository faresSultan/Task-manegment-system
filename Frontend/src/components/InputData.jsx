import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ InputDiv, setInputDiv, updatedData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", description: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    setData({
      title: updatedData.title,
      description: updatedData.description,
    });
  }, [updatedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async () => {
    if (Data.title === "" || Data.description === "") {
      alert("A field is missing");
    } else {
      await axios.post("http://localhost:8080/api/v1/tasks", Data, { headers });
      setData({ title: "", description: "" });
      setInputDiv("hidden");
    }
  };

  const handleUpdate = async () => {
    if (Data.title === "" || Data.description === "") {
      alert("A field is missing");
    } else {
      await axios.put(
        `http://localhost:8080/api/v1/tasks/${updatedData.id}`,
        Data,
        { headers }
      );
      setUpdatedData({ id: "", title: "", description: "" });
      setData({ title: "", description: "" });
      setInputDiv("hidden");
    }
  };

  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-900 opacity-75 backdrop-blur-md h-screen w-full`}
      ></div>

      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg bg-gray-50 dark:bg-zinc-800 p-6 border border-gray-300 dark:border-gray-600 rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105">
          <div className="flex justify-end">
            <button
              className="text-2xl text-gray-600 dark:text-gray-200 hover:text-red-500 hover:scale-110 transition-transform duration-200"
              onClick={() => {
                setInputDiv("hidden");
                setData({ title: "", description: "" });
                setUpdatedData({ id: "", title: "", description: "" });
              }}
              aria-label="Close"
            >
              <RxCross2 />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-4 py-3 rounded-lg w-full bg-gray-200 dark:bg-zinc-700 my-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent text-gray-900 dark:text-gray-100"
            value={Data.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Enter the task description"
            className="px-4 py-3 rounded-lg w-full bg-gray-200 dark:bg-zinc-700 my-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent text-gray-900 dark:text-gray-100"
            value={Data.description}
            onChange={handleChange}
          ></textarea>

          {updatedData.id === "" ? (
            <button
              onClick={handleSubmit}
              className="w-full p-3 bg-green-500 dark:bg-green-700 rounded-lg text-lg text-white font-semibold hover:bg-green-600 dark:hover:bg-green-900 transition-colors duration-300"
            >
              Add Task
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="w-full p-3 bg-blue-500 dark:bg-blue-700 rounded-lg text-lg text-white font-semibold hover:bg-blue-600 dark:hover:bg-blue-900 transition-colors duration-300"
            >
              Update Task
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
