require('dotenv').config()
const express = require('express')
const { join } = require('path')
const exphbs = require('express-handlebars')


// Intializations
const app = express()


// Settings
app.set('port', process.env.PORT || 4000)
app.set('views', join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: join(app.get('views'), 'layouts'),
  partialsDir: join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// Global variables
app.use( (req, res, next) => {
  app.locals.mpid = 0
  next()
})

// Routes
app.use('/pay', require('./routes/pay'))

// Public
app.use(express.static(join(__dirname, 'public')))

// Starting
app.listen(app.get('port'), () => {
  console.log("Server on port", app.get('port') )
})