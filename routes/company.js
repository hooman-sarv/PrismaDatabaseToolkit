const express = require('express')
const router = express.Router();

const companyCntr = require('../controllers/company')
const verify = require('../middleware/verify')

router.get('/', verify , companyCntr.getCompany)


module.exports = router;