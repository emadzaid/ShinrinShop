const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../backend/config/connectDB');
const express = require('express');

connectDB();
const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server listening to port ${process.env.PORT}`);
});
