const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const redis = require('redis')

// init app
const app = express()
app.use(express.static("public"))

// view engine
app.engine('handlebars', hbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// method override
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('searchusers')
})

app.listen('9000', () => {
    console.log('Server started on port 3000')
})