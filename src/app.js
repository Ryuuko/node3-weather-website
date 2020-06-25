const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather suck',
        name: 'Raymond Chu'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Raymond Chu'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        helpText: 'something to help u',
        title: 'Help me!',
        name: 'God Fucker'
    })
})


app.get('/weather', (req, res) =>{
    if( !req.query.address){
        return res.send({
            error: 'You must submit an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longtitude, (error, forecastData) => {
    
            if(error){
                return res.send({error})
            }
    
            // console.log(location)
            // console.log(forecastData)

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

             })

          })
    })




    // const latitude = 40
    // const longtitude = -70
    // forecast(latitude, longtitude, (error, forecastData) => {
    
    //     if(error){
    //         return console.log(error)
    //     }
    //     res.send(forecastData)
    //   })
    
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a serach term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        helpText: 'Help article not found',
        title: 'Not Found',
        name: 'Raymond Chu'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        helpText: 'Page not found',
        title: 'Not Found',
        name: 'Raymond Chu'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port 3000.' + port)
})
