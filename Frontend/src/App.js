import './App.css';
import Alltasks from './pages/AllTasks';
import Home from './pages/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ImportantTasks from './pages/Importanttasks';
import Completedtasks from './pages/CompletedTasks';
import InprogressTasks from './pages/InprogressTasks';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import {  useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate ()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }
    else if(!isLoggedIn){
      navigate('/Login');
    }

  },[]);
  
  return (
    <div className="bg-slate-100 text-gray-900 h-lvh  relative">
      
        
        <Routes>
          <Route exact path='/' element={<Home />}> 
            <Route index element={<Alltasks />} />
            <Route path='/importantTasks' element={<ImportantTasks />} />
            <Route path='/CompletedTasks' element={<Completedtasks />} />
            <Route path='/InprogressTasks' element={<InprogressTasks />} />
          </Route>

          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      
    </div>
  );
}

export default App;
