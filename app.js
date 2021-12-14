const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')


const router = require('./routes')

const userpPassport = require('./config/passport')
require('./config/mongoose')

const app = express();

const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs');

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

userpPassport(app)

app.use(router)

app.listen(PORT, () => {
    console.log('listening on port')
})