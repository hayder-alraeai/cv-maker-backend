const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/UserVerificationController')
router.route('/:id')
.get(verifyUser)
module.exports = router;