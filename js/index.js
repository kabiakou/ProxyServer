const https = require('https')
const moment = require('moment')
const axios = require('axios');

const API_KEY = process.env.NASA_API_KEY
const FEED_URl = process.env.NASA_API_FEED_URL

const now = moment()
const startDate = now.subtract(5, 'days').format('YYYY-MM-DD')
const endDate = now.format('YYYY-MM-DD')

const handleError = (err) => {
    console.error(`Error: ${err.message}`);
}

const handleResponse = (response) => {
    const asteroids = response.data;
    console.log(`Amount of asteroids were seen from ${startDate} to ${endDate}: ${asteroids.element_count}`);
    return asteroids
}

const getAsteroidsWithinPeriod = (startDate, endDate) => {
    axios.get(FEED_URl, {
        params: {
            start_date: startDate,
            end_date: endDate,
            api_key: API_KEY
        }
    })
        .then(handleResponse)
        .catch(handleError);
}

// getAsteroidsWithinPeriod(startDate, endDate)

module.exports = { getAsteroidsWithinPeriod };