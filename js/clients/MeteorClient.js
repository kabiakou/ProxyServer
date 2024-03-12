const axios = require('axios')

const API_KEY = process.env.NASA_API_KEY
const FEED_URl = process.env.NASA_API_FEED_URL

const getMeteorsWithinPeriod = async (startDate, endDate) => {
    return await axios.get(FEED_URl, {
        params: {
            start_date: startDate,
            end_date: endDate,
            api_key: API_KEY
        }
    })
}

module.exports = { getMeteorsWithinPeriod }