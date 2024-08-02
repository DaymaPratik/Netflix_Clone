const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const userRouter=require("./Router/userRouter");
const movieRouter=require('./Router/movieRouter');
const tvsRouter=require('./Router/tvsRouter');
const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))
app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/')
    .then(() => { console.log('DB Connected Successfully'); })
    .catch((e) => { console.log("Error connecting DB ", e); })

app.use(userRouter);
app.use(movieRouter);
app.use(tvsRouter);
app.listen(10000, () => { console.log("server is runnig at port 10000"); })
