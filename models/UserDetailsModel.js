const mongoose = require('mongoose')

const workSchema = mongoose.Schema({
    title: String,
    city: String,
    employer: String,
    startDate: Date,
    endDate: Date,
    description: String
})
const UserSchema = new mongoose.Schema({
    userId: String,
    firstName: {
        type: String,
        required: [true, 'First name is required!']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!']
    },
    email: String,
    phone: String,
    street: String,
    postCode: String,
    state: String,
    birthDate: Date,
    birthPlace: String,
    drivingLicense: String,
    gender: String,
    nationality: String,
    maritalStatus: String,
    linkedIn: String,
    website: String,
    aboutMe: String,
    workExperiences: [workSchema],
})
exports.UserDetails = mongoose.model('UserDetails', UserSchema)