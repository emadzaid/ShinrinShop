const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('../backend/config/connectDB');
const {errorHandler} = require('./middlwares/errorHandler');

const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');

connectDB();

const app = express();

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/collections', productRoute );
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute); 

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});
