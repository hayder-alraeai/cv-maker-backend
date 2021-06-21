const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const userAuthRouter = require('./routes/UserAuthRoute')
dotenv.config({path: `${__dirname}/config.env`})
const UserRouter = require('./routes/UserRoute')
const UserVerificationRoute = require('./routes/UserVerificationRoute')
const cors = require('cors');
//connection to database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => console.log('Connection is succeded...')).catch(err => console.log(err))

//Middlewares
app.use(cors());
app.use(express.json());
//Users endpoints CRUD
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/login', userAuthRouter)
app.use('/api/v1/verify', UserVerificationRoute)
app.use('/api/v1/test', (req, res, next) => {
    res.send('is running ...')
    next()
})
exports.app = app;