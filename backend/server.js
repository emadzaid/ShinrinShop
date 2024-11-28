const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config();

const connectDB = require('../backend/config/connectDB');
const express = require('express');


connectDB();
const app = express();

app.use(cookieParser())
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    
}));

const {errorHandler} = require('./middlwares/errorHandler');

const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/collections', productRoute );
app.use('/api/users', userRoute)

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});
