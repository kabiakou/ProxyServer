const https = require('https')
const moment = require('moment')

const API_KEY = process.env.NASA_API_KEY
const FEED_URl = process.env.NASA_API_FEED_URL
const START_DATE = moment('2024-02-26').format('YYYY-MM-DD')
const END_DATE = moment('2024-03-01').format('YYYY-MM-DD')

const buildUrl = (url, startDate, endDate, apiKey) => {
    return `${url}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
}

const getAsteroidsWithinPeriod = (startDate, endDate) => {
    https.get((buildUrl(FEED_URl, startDate, endDate, API_KEY)), (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(JSON.parse(data));
            console.log(`Amount of asteroids were seen from ${startDate} to ${startDate}: ${JSON.parse(data).element_count}`);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

getAsteroidsWithinPeriod(START_DATE, END_DATE)
