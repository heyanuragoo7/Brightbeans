const express = require('express');
const app = express();
const dbconnect = require('./connectdb/dbconnect')
const route = require('./routes/route')
const cors = require('cors');

require('dotenv').config();

dbconnect();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())

app.use('/api/v1', route);

app.listen(process.env.PORT, () => {
    console.log("Listening")
})

app.use((req,res) => {
    res.send("Server Started")
})