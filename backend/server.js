const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../backend/config/connectDB');
const express = require('express');

connectDB();
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173' // Frontend URL
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const {errorHandler} = require('./middlwares/errorHandler');
 
app.use('/api/collections', productRoute );
app.use('/api/users', userRoute)

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});
