const path = require('path');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this App',
        name : 'Mohamed Matar'
    });
});

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, {latitude, longitude, location}) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}

app.listen('3000', () => {
    console.log('listening on port 3000');
})