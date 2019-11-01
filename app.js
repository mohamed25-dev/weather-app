const path = require('path');

const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express');
const hbs     = require('hbs');

const app  = express();
const port = process.env.PORT || 3000;
//express configuration pathes
const publicPath   = path.join(__dirname, 'public');
const viewsPath    = path.join(__dirname, 'templates/views'); 
const partialsPath = path.join(__dirname, 'templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohamed Matar'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.search) {
        return res.send({
            'error' : 'No search was provided'
        });
    }

    getWeatherInfo(req.query.search, res);
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name : 'Mohamed Matar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mohamed Matar'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        name: 'Mohamed Matar'
    });
})

function getWeatherInfo(address, res) {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                "error":error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    "error":error
                });
            }

            res.send({
                "loaction": location,    
                "forecast": forecastData
            });
        })
    })
}

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})