const express = require('express')
const bodyParser= require('body-parser')

const app = express()

app.listen(8080, ()=>{
    console.log('App listening on port 8080')
})

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/home', (req, res)=>{
    res.send('Welcome to my first backend!')
})

app.post('/data', (req, res)=>{
    console.log(req.body)
    res.send('OK')
})

app.post('/profile', (req, res)=>{
    res.send(req.body)
})

const data = {
    name: 'Jane',
    batch: '17.2',
    email: 'janedoe@gmail.com'
}

app.patch('/profile', (req, res)=>{
    const result = {
        ...data,
        ...req.body
    }
    res.send(result)
})

app.put('/profile', (req, res)=>{
    const {name, batch, email} = req.body
    if(name && batch && email){
        var data = {
            ...req.body
        }
        res.send(data)
    }
    else{
        res.status(400).send({
            success: false,
            message: 'All form must be filled'
        })
    }
})

app.get('/profile', (req, res)=>{
    res.send(data)
})

app.delete('/profile', (req, res)=>{
    data = null,
    res.send(data)
})








