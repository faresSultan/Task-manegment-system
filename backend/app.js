const express = require('express');
const app = express();
require('dotenv').config();
require("./conn")

const cors = require('cors');
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/task')
const url = '/api/v1'
app.use(cors());
app.use(express.json());

app.use(url, authRoutes);
app.use(url, taskRoutes);


const PORT = 8080;

app.listen(PORT,()=>{
    console.log('running on 8080')
}); 