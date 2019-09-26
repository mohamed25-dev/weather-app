const path = require('path');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express');

const app = express();

console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));



const address = process.argv[2]
console.log(address)


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