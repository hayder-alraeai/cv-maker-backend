const express = require('express');
const router = express.Router();
const {getUserDetails, createUserDetails, addWork} = require('../controllers/UserDetailsController')

router
    .route('/:id')
    .get(getUserDetails)
    .post(createUserDetails)
router
    .route('/work/:id')
    .put(addWork)

module.exports = router