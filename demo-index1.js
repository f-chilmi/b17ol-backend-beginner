const express = require('express')
const bodyParser= require('body-parser')
const db = require('./src/helper/db')
const qs = require('querystring')

const app = express()

//middleware
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(8080, ()=>{
    console.log('App listening on port 8080')
})

app.post('/items', (req, res)=>{
    const {name, price, description} = req.body
    if(name && price && description){
        db.query(`INSERT INTO items (name, price, description) VALUE ('${name}', ${price}, "${description}")`, (err, result, field)=>{
            console.log(err)
            if(!err){
                res.status(201).send({
                    success: true,
                    message: 'Item has been created',
                    data: req.body
                })
            }else{
                console.log(err)
                res.status(500).send('err')
            }

        })
    }else{
        res.status(400).send({
            success: false,
            message: 'All field must be filled'
        })
    }

})

app.get('/items', (req, res)=>{
    
    let {page, limit, search} = req.query
    // console.log(req.query)
    let searchKey = ''
    let searchValue = ''
    if(typeof search === 'object'){
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
    }else{
        searchKey = 'name'
        searchValue = search 
        console.log(search)
    }
    
    if(!limit){
        limit=5
    }else{
        limit = parseInt(limit)
    }
    if(!page){
        page=1
    }else{
        page = parseInt(page)
    }

    const offset = (page-1)*limit

    const query = `SELECT * FROM items WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`

    db.query(query , (err, result, field)=>{
        console.log(query)
        if(!err){
            const pageInfo = {
                count : 0,
                pages : 1,
                currentPage : page,
                limitPerPage : limit,
                nextLink : null,
                prevLink : null
            }
            if(result.length){
                const query = `SELECT COUNT(*) AS count FROM items WHERE ${searchKey} LIKE '%${searchValue}%'`
                db.query(query , (err, data, field)=>{
                    console.log(query)
                    const {count} = data[0]
                    pageInfo.count = count
                    pageInfo.pages = Math.ceil(count/limit)

                    const {pages, currentPage} = pageInfo

                    if(currentPage<pages){
                        pageInfo.nextLink= `http://localhost:8080/items?${qs.stringify({...req.query, ...{page: page+1}})}`
                    }

                    if(currentPage>1){
                        pageInfo.prevLink= `http://localhost:8080/items?${qs.stringify({...req.query, ...{page: page-1}})}`
                    }

                    res.send({
                        success: true,
                        message: 'List of items',
                        data: result,
                        pageInfo
                    })
                })
                
            }else{
                res.send({
                    success: true,
                    message: 'There is no item on list',
                    pageInfo
                })
            }
            
        }else{
            console.log(err)
            res.send({
                success: false,
                message: 'Internal Server Error'
            })
        }
    })
})

app.put(`/items`, (req, res)=>{
    let {id} = req.query
    let {name, price, description} = req.body
    
    const query = `UPDATE items SET (name, price, description) VALUE ('${name}', ${price}, "${description}") WHERE items.id=${id}`
    db.query(query , (err, result, field)=>{
        
        if(name && price && description){
            console.log(req.body)
            res.send({
                
                success: true,
                result : req.body
            })
        }
        
    })
})