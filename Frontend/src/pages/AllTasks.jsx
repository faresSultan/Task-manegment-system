
import React, { useEffect, useState } from 'react';
import Cards from '../components/cards';
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from '../components/InputData';
import axios from 'axios';
const Alltasks = () => {
  const [InputDiv,setInputDiv] = useState("hidden");
  const [Data,setData]=useState();
  const[edited,setEdited]=useState({id:"",title:"",description:""});
 
  const headers= {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
  useEffect(()=>{
    const fetch = async ()=>{
      const response= await axios.get("http://localhost:8080/api/v1/tasks", {headers,});
      setData(response.data);
    };
    fetch(); 
  })
 
  
  return (
    <>
        <div>
            <div className='w-full flex justify-end px-4 py-2'>
                <button onClick={() =>setInputDiv("fixed")}><IoIosAddCircleOutline className=' text-3xl text-gray-900 dark:text-gray-200 hover:scale-150 transition-all duration-300' /></button>
            </div>
            {Data&& <Cards home = {"true"} setInputDiv = {setInputDiv} data={Data.tasks} setEdited={setEdited} />}
        </div>

        <InputData InputDiv = {InputDiv} setInputDiv = {setInputDiv} updatedData={edited} setUpdatedData={setEdited} />
    </>
   
  );
}

export default Alltasks;
