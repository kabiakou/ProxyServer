const axios = require('axios')
const { format } = require('date-fns')

const API_KEY = process.env.NASA_API_KEY
const FEED_URl = process.env.NASA_API_FEED_URL
const DATE_FORMAT = process.env.DATE_FORMAT

const getMeteorsWithinPeriod = async (startDate, endDate) => await axios.get(FEED_URl, {
    params: {
        start_date: format(startDate, DATE_FORMAT),
        end_date: format(endDate, DATE_FORMAT),
        api_key: API_KEY
    }
})

module.exports = { getMeteorsWithinPeriod }