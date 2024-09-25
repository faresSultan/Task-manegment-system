import React from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className='h-[98vh] flex flex-col items-center justify-center dark:bg-zinc-900'>
      <div>
        <img src="task-list_7458077.png" alt="logo" className='w-auto h-20 sm:h-40 object-contain pb-4 sm:pb-8 flex justify-items-center' />
      </div>

      <div className='p-4 w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-xl bg-gray-300 dark:bg-zinc-800'>
        <div className='text-lg sm:text-2xl font-semibold dark:text-gray-100'>Welcome to Taskaty!</div>
        
        <input type='email' placeholder='email' 
        className='bg-gray-200 dark:bg-zinc-700 px-3 py-2 my-2 sm:my-3 rounded w-full dark:text-gray-100'
        name='name@example.com' />

        <input type='password' placeholder='password' 
        className='bg-gray-200 dark:bg-zinc-700 px-3 py-2 my-2 sm:my-3 rounded w-full dark:text-gray-100'
        name='password' />
        
        <div className='w-full flex items-center justify-between'>
          <button className="w-1/3 sm:w-1/4 px-3 py-2 bg-blue-600 rounded-3xl text-sm sm:text-lg text-gray-100 hover:bg-blue-700">
              Log in
          </button>

          <Link to="/SignUp" className='text-zinc-600 dark:text-gray-400 text-sm'>
              Not having an account? <span className='hover:underline'>Click Here</span>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Login;
