const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./config/logger')
const db = require('./models')
const dataRoute = require('./src/routes/dataRoute')
const authRoute = require('./src/routes/authRoute')

const app = express()
app.use(bodyParser.json())


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    req.requestTime = "Today"
    next();
}
app.use(allowCrossDomain)

app.use(dataRoute)
app.use(authRoute)

app.get('/', (req,res)=>{
    res.send("Deployment success")
})

db.sequelize.sync().then((req)=>{
    app.listen(process.env.PORT || 8080, ()=>{
        logger.info("Listening to 8080")
    })
}).catch(err =>{
    logger.error(err.message)
})
