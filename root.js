const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const userAuthRouter = require('./routes/UserAuthRoute')
dotenv.config({path: `${__dirname}/config.env`})
const UserRouter = require('./routes/UserRoute')
//connection to database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => console.log('Connection is succeded...')).catch(err => console.log(err))

//Middlewares
app.use(express.json());
//Users endpoints CRUD
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/login', userAuthRouter)

exports.app = app;