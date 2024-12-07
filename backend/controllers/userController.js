const User = require('../models/userModel');
const asyncHandler = require('../middlwares/asyncHandler')
const generateToken = require('../utils/generateToken');


const registerUser = asyncHandler (async(req,res) => {
    const {name, email, password} = req.body;

    // check if user exists
    const existUser = await User.findOne({email});
    if(existUser) {
        res.status(400);
        throw new Error('User already exist');
    }

    const user = await User.create({name, email, password});
    if(user) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

})


const authUser = asyncHandler (async(req,res) => {
        const {email, password} = req.body;
    
        // check if user exists
        const user = await User.findOne({email});
        if(user) {
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch) {
                    // generate token
                    generateToken(res, user._id);
    
                    res.status(200).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    })
                } else {
                    res.status(401).json({message: 'Invalid Email or Passowrd'});
                }
            });
        } else {
            res.status(404).json({message: 'Resource Not Found'});
        }
    
    })


// @description logout user (clear cookies)
// @Method POST /api/users/
// @Access PUBLIC

const logoutUser = asyncHandler (async(req,res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'Logged out successfully' });

})


// @description get my profile
// @Method GET /api/users/profile
// @Access PRIVATE

const getUserProfile = asyncHandler (async(req,res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        res.status(200).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        );
    } else {
        res.status(404);
        throw new Error('User not found');
    }

})

// @description update user profile
// @Method PUT /api/users/profile
// @Access PRIVATE

const updateProfile = asyncHandler (async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        updatedUser = await user.save();

        res.status(200).json(
            {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            }
        );
    } else {
        res.status(404);
        throw new Error('User not found');
    }

})


// @description get all users
// @Method GET /api/users/
// @Access PRIVATE/ADMIN

const getAllUsers = asyncHandler (async(req,res) => {
    const users = await User.find({});
    if(users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({message: 'Resource Not Found'});
    }

})



module.exports = {getAllUsers, registerUser, authUser, logoutUser, getUserProfile, updateProfile};