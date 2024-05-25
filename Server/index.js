const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const app = express();
const connectDB = require('./db/connectDB');
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json());
app.use(morgan('combined'))

connectDB()

app.get('/',(req,res)=>{
    res.send('hello word')
})


const PORT =  process.env.PORT || 8000

app.listen(PORT,()=>{
     console.log('SERVER RUNING PORT',PORT);
})






