const express = require('express');
const app = express();
const router = express.Router();

const {getAllUsers, authUser} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/auth', authUser);

module.exports = router;