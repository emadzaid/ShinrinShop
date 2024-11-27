const User = require('../models/userModel');
const asyncHandler = require('../middlwares/asyncHandler')


// @description get all users
// @Method GET /api/users/
// @Access PUBLIC

const authUser = asyncHandler (async(req,res) => {
    const {email, password} = req.body;
    console.log(email, password)
   
    // check if user exists
    const user = await User.findOne({email});
    if(user) {
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            if(isMatch) {
                // generate token
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


// @description authenticate user
// @Method GET /api/users/
// @Access TEMP:PUBLIC

const getAllUsers = asyncHandler (async(req,res) => {
    const users = await User.find({});
    if(users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({message: 'Resource Not Found'});
    }

})

module.exports = {getAllUsers, authUser};