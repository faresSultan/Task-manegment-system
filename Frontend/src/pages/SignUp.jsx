import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState(""); 
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  if (isLoggedIn) {
    navigate('/');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      
      if (data.username === "" || data.email === "" || data.password === "") {
        setError("All fields are required");
        return; 
      }

      const response = await axios.post("http://localhost:8080/api/v1/auth/register", data);
      navigate("/Login");
    } catch (error) {
      setError(error.response.data.message); 
    }
  };

  return (
    <div className='min-h-[100vh] flex flex-col items-center justify-center dark:bg-zinc-900'>
      <div>
        <img src="task-list_7458077.png" alt="logo" className='w-auto h-20 sm:h-40 object-contain pb-4 sm:pb-8 flex justify-items-center' />
      </div>

      <div className='p-4 w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-xl bg-gray-300 dark:bg-zinc-800'>
        <div className='text-lg sm:text-2xl font-semibold dark:text-gray-100'>Sign up in Taskaty</div>

        {error && <div className='text-red-500 mb-2'>{error}</div>} 

        <form onSubmit={handleSubmit}> 
          <input
            type='text'
            placeholder='Username'
            className='bg-gray-200 dark:bg-zinc-700 px-3 py-2 my-2 sm:my-3 rounded w-full dark:text-gray-100'
            name='username'
            onChange={handleChange}
            value={data.username}
          />

          <input
            type='email'
            placeholder='Email'
            className='bg-gray-200 dark:bg-zinc-700 px-3 py-2 my-2 sm:my-3 rounded w-full dark:text-gray-100'
            name='email'
            onChange={handleChange}
            value={data.email}
          />

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='bg-gray-200 dark:bg-zinc-700 px-3 py-2 my-2 sm:my-3 rounded w-full dark:text-gray-100'
              name='password'
              onChange={handleChange}
              value={data.password}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className='w-full flex items-center justify-between'>
            <button
              type="submit" 
              className="w-1/3 sm:w-1/4 px-3 py-2 bg-blue-600 rounded-3xl text-sm sm:text-lg text-gray-100 hover:bg-blue-700"
            >
              Sign up!
            </button>

            <Link to="/Login" className='text-zinc-600 dark:text-gray-400 text-sm'>
              Already have an account? <span className='hover:underline'>Log in</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
