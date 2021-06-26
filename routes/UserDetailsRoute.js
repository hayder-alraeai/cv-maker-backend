const express = require('express');
const router = express.Router();
const {getUserDetails, createUserDetails} = require('../controllers/UserDetailsController')

router
    .route('/:id')
    .get(getUserDetails)
    .post(createUserDetails)

module.exports = router