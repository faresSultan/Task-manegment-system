
import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { CgDarkMode } from "react-icons/cg";
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { DarkModeContext } from '../DarkModeContext'; 
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext); 
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = ()=> {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <>
      <div className={`w-full h-[10vh] ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-700'} flex justify-between items-center p-2 md:p-4`}>
        <div className="flex items-center">
          <Link to="/">
            <img src="task-list_7458077.png" alt="logo" className="w-auto h-8 md:h-12 object-contain" />
          </Link>
          
          <div className="h-8 border-l-2 border-gray-400 mx-2"></div>
          
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl md:text-3xl text-gray-300 hover:scale-110 transition-all mr-2">
            {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled /> : <TbLayoutSidebarLeftExpandFilled />}
          </button>
        </div>

        <div className="flex items-center bg-gray-200 dark:bg-zinc-800 rounded-full px-4 py-2 w-full max-w-md mx-4">
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-gray-800 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div className="flex items-center">
          <button title='Dark Mode' onClick={toggleDarkMode} className="text-2xl md:text-3xl text-gray-300 hover:scale-110 transition-all mr-2 md:mr-4">
            <CgDarkMode />
          </button>

          <button onClick={handleLogout} title='Log Out' className="text-2xl md:text-3xl text-gray-300 hover:translate-x-1 transition-all">
            <IoIosLogOut />
          </button>
        </div>
      </div>

      <div className={`flex ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-200'} min-h-[90vh]`}> 
        {isSidebarOpen && (
          <div className="hidden lg:block w-1/6 p-4"> 
            <Sidebar />
          </div>
        )}

        <div className={`lg:hidden ${isSidebarOpen ? "w-full" : "hidden"} border-r-2 p-4`}>
          <Sidebar />
        </div>

        <div className={`transition-all ${isSidebarOpen ? "lg:w-5/6 hidden lg:block" : "w-full"} bg-white dark:bg-zinc-800 rounded-xl p-6 ml-4`}>
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </>
  );
};

export default Home;
