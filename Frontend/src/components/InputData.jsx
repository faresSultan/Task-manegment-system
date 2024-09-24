import React from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ InputDiv, setInputDiv }) => {
  return (
    <>
      <div className={`${InputDiv} top-0 left-0 bg-gray-100 dark:bg-zinc-900 opacity-50 h-screen w-full`}></div>
      <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg bg-gray-100 dark:bg-zinc-800 p-4 border border-gray-600 rounded-2xl text-gray-800 dark:text-gray-100">
          <div className="flex justify-end">
            <button className="text-2xl hover:scale-125" onClick={() => setInputDiv("hidden")}>
              <RxCross2 />
            </button>
          </div>

          <input type="text" placeholder="Title" name="title" 
          className="px-3 py-2 rounded w-full bg-gray-300 dark:bg-zinc-700 my-2 dark:text-gray-100" />

          <textarea name="discription" cols="30" rows="5" placeholder="Enter the task description"
          className="px-3 py-2 rounded w-full bg-gray-300 dark:bg-zinc-700 my-2 dark:text-gray-100"></textarea>

          <button className="w-full p-2 bg-green-500 dark:bg-green-800 rounded-xl text-lg text-gray-100 mt-2 hover:bg-green-600 dark:hover:bg-green-900">
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
