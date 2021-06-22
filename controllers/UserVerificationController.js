const UserModel = require('../models/UserModel')
exports.verifyUser = (req, res, next) => {
    if(req.body.password) return res.status(400).json({status: 'badrequest', message: 'Leo blir arg..'})
    if(!req.params.id) return res.status(400).json({status: 'faile', message: 'User is not found!'})
    UserModel.User.findByIdAndUpdate(req.params.id, {isEnabled: true}, (err, doc, raw) => {
        if(err){
            res.status(404).json({status: 'Not found', message: 'User is not found!'})
        }
    })
    .then( user => {
        if(user.isEnabled){
            res.status(400).json({status: 'Bad request', message: 'You are already verified!'})
        }
        res.status(200).json({
            status: 'success',
            message: 'You has been verified, please login to your account!' 
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(401)
        .json({status: 'faile', message: err})
    })

}