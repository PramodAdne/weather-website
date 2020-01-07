const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(path.join(__dirname, '../public'))

//Defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express()

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pramod R Adne'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pramod R Adne'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help page message',
        title: 'Help page',
        name: 'Pramod R Adne'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address with query parameter'
        })
    }

    geoCode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lattitude, longitude, (err, forecastData) => {
            if (err) {
                res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

}
)

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        errMsg: 'Help article not found',
        title: 'Not Found',
        name: 'Pramod'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please Provide a Search Term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404 Page',
        errMsg: 'The page you are looking for is hiding in different galaxy :P',
        name: 'Pramod'
    })
})



app.listen(3000, () => {
    console.log('Application is running at port 3000')
})