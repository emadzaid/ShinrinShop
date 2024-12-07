const express = require('express');
const app = express();
const router = express.Router();
const {protect, admin} = require('../middlwares/authMiddleware');

const {getAllUsers, authUser, logoutUser, registerUser, getUserProfile, updateProfile} = require('../controllers/userController');

router.post('/', registerUser); // public 
router.post('/auth', authUser); 
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile); // protected
router.put('/profile', protect, updateProfile); // protected

router.get('/', protect, admin, getAllUsers);

module.exports = router;