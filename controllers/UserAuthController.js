const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel')
exports.login = async(req, res) => {
    if(!req.body.email || !req.body.password) return res.status(401).json({status: 'unauthorized'})
    UserModel.User.findOne({email: req.body.email}).select('+password')
    .then(user => {
        if(!user) {
            return res.status('404').json({
                status: 'faild',
                message: 'Username or password is incorrect'
            })
        }
        return user
    })
    .then(user => {
        return bcrypt.compare(req.body.password, user.password).then(result => {
            if(!result){
                return res.status('404').json({
                    status: 'faild',
                    message: 'Username or password is incorrect'
                })
            }
            if(!user.isEnabled){
                return res.status('401').json({
                    status: 'unauthorized',
                    message: 'Yout account is not verified! Please verify your email address and try login again!'
                })
            }
            // const token = jwt.sign({userId: user.id, email: user.email, exp: Math.floor(Date.now() / 1000) + 60}, process.env.JWT_SECRET)
            const token = jwt.sign({userId: user.id, email: user.email, exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24 * 90}, process.env.JWT_SECRET)
            return res.status('200').json({
                status: 'success',
                token: token
            })
        })
    })
    .catch(err => {
        return res.status('400').json({
            status: 'faild',
            message: err
        })
    })
}
exports.secureEndpoint = async(req, res, next) => {
    try{
            // check if header has a token
            if(!req.headers.authorization && !req.headers.authorization.startsWith('Bearer')) return res.status(401).json({status: 'unauthorized'})
            //check if token is valid and not modified
            if(!jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)) return res.status(401).json({status: 'unauthorized'})
            //check if user still exist
            if(await UserModel.User.findById(jwt.decode(req.headers.authorization.split(' ')[1]).userId).then(user => user).catch(err => console.log(err)) === null) return res.status(401).json({status: 'unauthorized'})
            next()
    }catch(err){
        res.status(401).json({status: 'unauthorized', message: err.message})
    }

}