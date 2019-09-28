const path = require('path');

const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express');
const hbs     = require('hbs');

const app = express();

const publicPath   = path.join(__dirname, 'public');
const viewsPath    = path.join(__dirname, 'templates/views'); 
const partialsPath = path.join(__dirname, 'templates/partials');

console.log(partialsPath);

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {title: 'Home'});
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name : 'Mohamed Matar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help'});
})

app.get('*', (req, res) => {
    res.render('404', {errorMessage: 'Page Not Found'});
})
// const address = process.argv[2]

// if (!address) {
//     console.log('Please provide an address')
// } else {
//     geocode(address, (error, {latitude, longitude, location}) => {
//         if (error) {
//             return console.log(error)
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return console.log(error)
//             }

//             console.log(location)
//             console.log(forecastData)
//         })
//     })
// }

app.listen('3000', () => {
    console.log('listening on port 3000');
})