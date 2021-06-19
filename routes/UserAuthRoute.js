const express = require('express')
const {login} = require('../controllers/UserAuthController')
const router = express.Router()

router
    .route('/').post(login)
module.exports = router;