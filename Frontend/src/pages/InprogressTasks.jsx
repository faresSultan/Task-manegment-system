import axios from 'axios';
import Cards from '../components/cards';
import React, { useEffect, useState } from 'react';
import InputData from '../components/InputData';
const InprogressTasks = () => {
  const [InputDiv,setInputDiv] = useState("hidden");
  const[edited,setEdited]=useState({id:"",title:"",description:""});
  const [Data,setData]=useState([]);
 
  const headers= {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`}
  useEffect(()=>{
    const fetch = async (filter)=>{
      const response= await axios.get(`http://localhost:8080/api/v1/tasks?filter=${filter}`, {headers,});
      
      setData(response.data.tasks);
    };
    fetch("incomplete"); 
  })
  return (
    <div>
    <Cards  home={"false"} data={Data} setInputDiv = {setInputDiv}  setEdited={setEdited}/>
    <InputData InputDiv = {InputDiv} setInputDiv = {setInputDiv} updatedData={edited} setUpdatedData={setEdited} />
    </div>
  );
}

export default InprogressTasks;