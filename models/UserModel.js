const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'This email is used!']
    },
    password: {
        type: String,
        select: false,
        minLength: 8,
        required: [true, 'Password is required!']
    },
    isEnabled: {
        type: Boolean,
        default: false
    }
})
exports.User = mongoose.model('User', UserSchema)