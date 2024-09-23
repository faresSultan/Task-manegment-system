import React, { useContext } from 'react';
import { CgNotes } from "react-icons/cg";
import { MdNotificationImportant } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../DarkModeContext'; 

const Sidebar = () => {
  const { isDarkMode } = useContext(DarkModeContext); 

  const data = [
    { title: "All tasks", icon:  <CgNotes />, link: "/" },
    { title: "Important tasks", icon: <MdNotificationImportant />, link: "/importantTasks" },
    { title: "Completed tasks", icon: <MdOutlineDoneOutline />, link: "/CompletedTasks" },
    { title: "In progress", icon: <GrInProgress />, link: "/InprogressTasks" },
  ];
  
  return (
    <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-800'} flex flex-col justify-center`}>
      <div>
        <h2 className='text-xl font-semibold'>Your Name</h2>
        <h4 className='mb-1 text-s'>email@domain.com</h4>
        <hr className="h-px my-8 border-0 bg-gray-500 dark:bg-zinc-600"/>
      </div>
    
   
    </div>
  );
};

export default Sidebar;
