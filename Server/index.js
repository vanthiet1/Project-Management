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
const userRouter = require('./routers/user/userRouter');
const authRouter = require('./routers/auth/authRouter');
const projectRouter = require('./routers/project/projectRouter');
const memberProjectRouter = require('./routers/project/memberProjectRouter');




app.get('/',(req,res)=>{
    res.send('hello word')
})

app.use('/api/v1/user/',userRouter)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/member/project', memberProjectRouter);



const PORT =  process.env.PORT || 8000

app.listen(PORT,()=>{
     console.log('SERVER RUNING PORT',PORT);
})






