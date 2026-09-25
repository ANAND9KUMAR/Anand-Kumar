const express = require('express');
const authMiddleware = require('../middlewares/auth');
const requireRole = require('../middlewares/role');
const { getUsers, createUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.use(authMiddleware);

// Only admins can manage users
router.use(requireRole(['admin']));

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);

module.exports = router;
