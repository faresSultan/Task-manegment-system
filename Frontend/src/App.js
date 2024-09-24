
import './App.css';
import Alltasks from './pages/AllTasks';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImportantTasks from './pages/Importanttasks';
import Completedtasks from './pages/CompletedTasks';
import InprogressTasks from './pages/InprogressTasks';
//import SignUp from './pages/SignUp';  mestany ismail beh ye5alas 
//import Login from './pages/Login';
const App = () => {
  return (
    <div className="bg-slate-100 text-gray-900 h-lvh  relative">
      <Router>
        <Routes>
          <Route exact path='/' element = {<Home />}> 
            <Route index element = {<Alltasks />} />
            <Route path= '/importantTasks' element = {<ImportantTasks /> } />
            <Route path= '/CompletedTasks' element = {<Completedtasks /> } />
            <Route path= '/InprogressTasks' element = {<InprogressTasks /> } />
          </Route>

          {/* <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
