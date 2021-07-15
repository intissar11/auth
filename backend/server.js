const express = require('express');
const connectDB = require('./Config/connectDB');
const router = require('./routes/ProfileRouter');



const app =express();

app.use(express.json());
app.use('/auth',router)

require("dotenv").config({ path:'./Config/.env',});
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is running on port ${PORT}`)
);