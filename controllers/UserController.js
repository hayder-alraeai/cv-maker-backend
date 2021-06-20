const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const main = require('../service/mailer')

exports.getUsers = (req, res, next) => {
    UserModel.User.find().then((users) => {
        res.status(200).json({
            status: 'success',
            created: new Date().toISOString(),
            data: users.length,
            users
        })
    })
    
}
exports.getUser = (req, res, next) => {
    UserModel.User.findById(req.params.id).then((user) => {
        res.status(200).json({
            status: 'success',
            user
        })
    }).catch((err) => {
        console.log(err);
        return res.status(401)
        .json({status: 'faile', message: err})
    })
}
exports.createUser = async(req, res, next) => {
    // if(await UserModel.User.findOne(user => user.email === req.body.email)) return res.status(401).json({status: 'Bad request', message: 'This email is already taken, please login instead!'})
    UserModel.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12)
    })
    .save()
    .then((user) => {
        const body = `Click this link https://${req.headers.host}/api/v1/verify/${user.id} to verify your account!`
        main(user.email, 'Email Verification', body)
        return user
    })
    .then((user => res.status(201).json({status: 'success', message: 'created', user})))
    .catch(err => {
        console.log(err);
        return res.status(401)
        .json({status: 'faile', message: err})
    })
}
exports.deleteUser = (req, res, next) => {
    UserModel.User.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'no content',
            user: null
        
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(401)
        .json({status: 'faile', message: err})
    })
}
exports.updateUser = (req, res, next) => {
    if(req.body.password) return res.status(400).json({status: 'badrequest', message: 'Leo blir arg..'})
    UserModel.User.findByIdAndUpdate(req.params.id, req.body)
    .then( user => {
        res.status(200).json({
            status: 'success',
            user 
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(401)
        .json({status: 'faile', message: err})
    })
}
