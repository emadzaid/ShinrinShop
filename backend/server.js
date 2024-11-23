const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../backend/config/connectDB');
const express = require('express');

connectDB();
const app = express();

const Product = require('./models/productModel');


app.get('/', (req,res) => {
    res.send('Homepage');
});

app.get('/api/products', async (req,res) => {
    const products = await Product.find({});
    res.status(200).json(products);
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});
