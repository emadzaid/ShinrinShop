const dotenv = require('dotenv');
dotenv.config()
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlwares/asyncHandler');
const User = require('../models/userModel');


const protect = asyncHandler(async (req,res,next) => {
    let token;
    // get token
    token = req.cookies.jwt;
    console.log('token', token);

    if(token) {
       try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch(error) {
            res.status(401);
            throw new Error('Not Authorized, token failed');
        }
           
    } else {
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
})


// Admin protection

const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized, admin only');
    }
}

module.exports = {protect, admin};