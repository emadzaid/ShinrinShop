const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const generateToken = ((res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
    })

    // store JWT as HTTP only cookie
    console.log('Environment:', process.env.NODE_ENV);

    res.cookie('jwt', token , {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'Development' ? false : true,  // Use HTTPS in production
        sameSite: 'strict', // Helps prevent CSRF Attack
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    
})

module.exports = generateToken;