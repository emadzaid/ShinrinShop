const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDB = require('../backend/config/connectDB');
const {notFound, errorHandler} = require('./middlwares/errorHandler');

const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const uploadRoute = require('./routes/uploadRoute');

connectDB();

const app = express();
const _dirname = path.resolve();

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
app.use('/api/uploads', uploadRoute);

app.use('/uploads', express.static(path.join(_dirname, '/uploads')));

app.get('/api/config/paypal', (req,res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID }));

if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static(path.join(_dirname, '/frontend/dist')));
    
    // any route that is not api will be redirected to index.html
    app.get('*', (req,res) => res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html')));
} else {
    app.get('/', (req,res) => res.send('API is running....'))
}

app.use(notFound);
app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});
