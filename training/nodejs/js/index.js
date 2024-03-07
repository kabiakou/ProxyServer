const https = require('https') 

const FEED_URl = "https://api.nasa.gov/neo/rest/v1/feed"
const START_DATE = "2024-02-26"
const END_DATE = "2024-03-01"
const API_KEY = "KhS7EQVPfk4NLgak8tr7LgNjVNbI0Feuj4q3cMC3"

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