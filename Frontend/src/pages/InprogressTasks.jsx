import React, { useEffect, useState } from 'react';
import Cards from '../components/cards';
import InputData from '../components/InputData';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const InprogressTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [edited, setEdited] = useState({ id: "", title: "", description: "" });
  const [Data, setData] = useState([]);
  const { searchQuery } = useOutletContext(); 

  const headers = { id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}` };

  useEffect(() => {
    const fetch = async (filter) => {
      const response = await axios.get(`http://localhost:8080/api/v1/tasks?filter=${filter}`, { headers });
      setData(response.data.tasks);
    };
    fetch("incomplete");
  });

  const filteredData = Data.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Cards home={"false"} data={filteredData} setInputDiv={setInputDiv} setEdited={setEdited} />
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} updatedData={edited} setUpdatedData={setEdited} />
    </div>
  );
};

export default InprogressTasks;
