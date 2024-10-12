import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios';
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    navigate('/');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(""); 

    try {
      if (data.username === "" || data.password === "") {
        setError("All fields are required"); 
      } else {
        const response = await axios.post("http://localhost:8080/api/v1/auth/login", data);
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred"); 
    }
  };

  return (
    <div className='min-h-[100vh] flex flex-col items-center justify-center dark:bg-zinc-900'>
      <div>
        <img src="task-list_7458077.png" alt="logo" className='w-auto h-20 sm:h-40 object-contain pb-4 sm:pb-8 flex justify-items-center' />
      </div>

      <form onSubmit={handleSubmit} className='p-4 w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-xl bg-gray-300 dark:bg-zinc-800'>
        <div className='text-lg sm:text-2xl font-semibold dark:text-gray-100'>Log-in to Taskaty!</div>

        <input
          type='text'
          placeholder='username'
          className='bg-gray-200 dark:bg-zinc-700 px-3 py-2 my-2 sm:my-3 rounded w-full dark:text-gray-100'
          name='username'
          onChange={handleChange}
          value={data.username}
        />

        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='password'
            className='bg-gray-200 dark:bg-zinc-700 px-3 py-2 my-2 sm:my-3 rounded w-full dark:text-gray-100'
            name='password'
            onChange={handleChange}
            value={data.password}
            autoComplete="current-password"
          />

          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* added validation instead of alert */}
        {error && <div className='text-red-500 text-sm'>{error}</div>}

        <div className='w-full flex items-center justify-between'>
          <button type="submit" className="w-1/3 sm:w-1/4 px-3 py-2 bg-blue-600 rounded-3xl text-sm sm:text-lg text-gray-100 hover:bg-blue-700">
            Log in
          </button>

          <Link to="/SignUp" className='text-zinc-600 dark:text-gray-400 text-sm'>
            First time? <span className='hover:underline'>Click Here</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
