const express = require('express');
const {createUser, loginUser, getAllUsers , updateUser, getUser} = require('../controller/user');
const router = express.Router();
const {authMiddleware } = require('../middleware/auth');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id',authMiddleware, getUser);
router.get('/',authMiddleware, getAllUsers);
router.patch('/:id', authMiddleware, updateUser);

module.exports = router;