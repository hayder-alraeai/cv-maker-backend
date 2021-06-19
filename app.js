const {app} = require('./root')

const dotenv = require('dotenv')
dotenv.config({path: `${__dirname}/config.env`})

app.listen(process.env.PORT || 5000)