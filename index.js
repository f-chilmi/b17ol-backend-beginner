const express = require('express')

const app = express()

app.get('/home', (req, res)=>{
    res.send('Welcome to my first backend!')
})

app.listen(8080, ()=>{
    console.log('App listening on port 8080')
})