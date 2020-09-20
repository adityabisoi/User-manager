const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const redis = require('redis')

// init app
const app = express()

// Connect to Redis
const client = redis.createClient()
client.on('connect', ()=> {
    console.log('Connected to redis')
})

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

app.get('/', (req, res, next) => {
    res.render('searchusers')
})

app.post('/users/search', (req,res,next) => {
    const id = req.body.id

    client.hgetall(id, (err, obj) => {
        if(!obj) {
            res.render('searchusers', {
                error: 'User doesn\'t exist'
            })
        }
        else {
            obj.id = id
            res.render('details', {
                user: obj
            })
        }
    })
})

app.listen('3000', () => {
    console.log('Server started on port 3000')
})