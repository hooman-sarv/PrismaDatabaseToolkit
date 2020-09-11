const express = require('express')
const router = express.Router();

const userCntr = require('../controllers/user')

const verify = require('../middleware/verify')

router.get('/', userCntr.getUsers)
router.post('/signup', userCntr.signup)
router.post('/login', userCntr.login)
router.post('/logout', userCntr.logout)
router.delete('/:email' ,verify, userCntr.deleteUser);

module.exports = router;