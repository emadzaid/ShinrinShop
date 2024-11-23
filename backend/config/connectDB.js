const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to DB: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}

module.exports = connectDB;