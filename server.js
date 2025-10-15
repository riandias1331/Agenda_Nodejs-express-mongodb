require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 3333
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('DataBase Connected')
        app.emit('dataBase')
    })
    .catch(e => console.log(e))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const routes = require('./routes')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const { middlewareGlobal, checkcsrferror, csrMiddleware } = require('./src/middlewares/middleware')

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
    secret: 'askodjiyfdygdlm',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csrf())
app.use(middlewareGlobal)
app.use(checkcsrferror)
app.use(csrMiddleware)
app.use(routes)

app.on('dataBase', () => {
    app.listen(port, () => {
        console.log('Server Is Running')
    });
});
