const express = require('express')
const bodyParser= require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/home', (req, res)=>{
    res.send('Welcome to my first backend!')
})

app.use(express.static('assets'))

app.get('/', (req, res)=>{
    res.sendFile("index.html")
})

app.post('/data', (req, res)=>{
    console.log('data:', req.body)
    res.sendStatus(200)
})

app.post('/profile', (req, res)=>{
    
    
})








app.listen(8080, ()=>{
    console.log('App listening on port 8080')
})