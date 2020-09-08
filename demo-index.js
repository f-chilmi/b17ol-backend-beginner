const express = require('express')

const app = express()

app.use('/assets', express.static('assets'))

app.get('/', (request, response)=>{
    response.send('Hello!')
})

app.get('/home', (request, response)=>{
    response.send('Welcome home!')
})

app.get('/items', (req, res)=>{
    res.send({
        success: true,
        message: 'listing items',
        data: [
            {
                id : 1,
                name : 'barang antik: sapu',
                price : 10000,
                description : 'sapu adalah blablabla'
            },
            {
                id : 2,
                name : 'barang antik: sapu',
                price : 10000,
                description : 'sapu adalah blablabla'
            },
            {
                id : 3,
                name : 'barang antik: sapu',
                price : 10000,
                description : 'sapu adalah blablabla'
            }
        ]
    })
})

app.listen(8080, ()=>{
    console.log('App listening on port 8080')
})

