const UserDetails = require('../models/UserDetailsModel')


exports.getUserDetails = (req, res, next) => {
    UserDetails.UserDetails.findOne({userId: req.params.id}).then((userDetails) => {
        res.status(200).json({
            status: 'success',
            userDetails
        })
    }).catch((err) => {
        console.log(err);
        return res.status(404)
        .json({status: 'faile', message: err})
    })
}
exports.createUserDetails = async(req, res, next) => {
    UserDetails.UserDetails({
        userId: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        street: req.body.street,
        postCode: req.body.postCode,
        state: req.body.state,
        birthDate: req.body.birthDate,
        birthPlace: req.body.birthPlace,
        drivingLicense: req.body.drivingLicense,
        gender: req.body.gender,
        nationality: req.body.nationality,
        maritalStatus: req.body.maritalStatus,
        linkedIn: req.body.linkedIn,
        website: req.body.website,
        aboutMe: req.body.aboutMe
    })
    .save()
    .then((userDetails => res.status(201).json({status: 'success', message: 'created', userDetails})))
    .catch(err => {
        console.log(err);
        return res.status(403)
        .json({status: 'faile', message: err})
    })
}