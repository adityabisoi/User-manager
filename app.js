const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const redis = require('redis')
const app = express()

app.get('/', (req,res) => {
    res.status(200).json({
        message: 'Hello'
    })
})

app.listen('3000', () => {
    console.log('Server started on port 3000')
})