const axios = require('axios')
const { format } = require('date-fns')

const ROVER_PHOTOS_URL = process.env.NASA_API_ROVER_PHOTO_URL
const ROVER_MANIFEST_URL = process.env.NASA_API_ROVER_MANIFEST_URL
const DATE_FORMAT = process.env.DATE_FORMAT

const getRoverPhotosByDate = async (date, apiKey) => await axios.get(ROVER_PHOTOS_URL, {
    params: {
        earth_date: format(date, DATE_FORMAT),
        api_key: apiKey
    }
})

const getRoverManifiest = async (apiKey) => await axios.get(ROVER_MANIFEST_URL, {
    params: {
        api_key: apiKey
    }
})

module.exports = { getRoverPhotosByDate, getRoverManifiest }