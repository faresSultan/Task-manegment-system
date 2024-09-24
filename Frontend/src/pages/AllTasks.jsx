
import React, { useState } from 'react';
import Cards from '../components/Cards';
import { IoIosAddCircleOutline } from "react-icons/io";
//import InputData from '../components/Home/InputData'; mestany Omar beh ye5alas :)
const Alltasks = () => {
  const [InputDiv,setInputDiv] = useState("hidden");
  return (
    <>
        <div>
            <div className='w-full flex justify-end px-4 py-2'>
                <button onClick={() =>setInputDiv("fixed")}><IoIosAddCircleOutline className=' text-3xl text-gray-900 dark:text-gray-200 hover:scale-150 transition-all duration-300' /></button>
            </div>
            <Cards home = {"true"} InputDiv = {InputDiv} setInputDiv = {setInputDiv} />
        </div>

        {/* <InputData InputDiv = {InputDiv} setInputDiv = {setInputDiv} /> */}
    </>
   
  );
}

export default Alltasks;
