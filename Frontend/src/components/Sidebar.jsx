import React, { useContext, useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { MdNotificationImportant } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext'; 
import axios from 'axios';

const Sidebar = () => {
  const { isDarkMode } = useContext(DarkModeContext); 

  const data = [
    { title: "All tasks", icon:  <CgNotes />, link: "/" },
    { title: "Important tasks", icon: <MdNotificationImportant />, link: "/importantTasks" },
    { title: "Completed tasks", icon: <MdOutlineDoneOutline />, link: "/CompletedTasks" },
    { title: "In progress", icon: <GrInProgress />, link: "/InprogressTasks" },
  ];
  const [Data,setData]=useState();
  const headers= {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
  useEffect(()=>{
    const fetch = async ()=>{
      const response= await axios.get("http://localhost:8080/api/v1/tasks", {headers,});
      setData(response.data);
    };
    fetch(); 
  },[])
  
  return (
    <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-800'} flex flex-col justify-center`}>
    {Data && (
      <div>
        <h2 className='text-xl font-semibold'>{Data.user.username}</h2>
        <h4 className='mb-1 text-s'>{Data.user.email}</h4>
        <hr className="h-px my-8 border-0 bg-gray-500 dark:bg-zinc-600"/>
      </div>
    )}
    
      <div className='text-lg '>
        {data.map((items, i) => (
          <Link to={items.link} key={i} className='my-2 flex items-center inline-block hover:underline '>
            {items.icon} 
            <span className='ml-2'>{items.title}</span>
          </Link> 
        ))}
        <hr className="h-px my-8 border-0 bg-gray-500  dark:bg-zinc-600"/>
      </div>
    </div>
  );
};

export default Sidebar;
