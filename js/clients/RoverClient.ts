import axios from 'axios'
import { format } from 'date-fns'

const ROVER_PHOTOS_URL: string = process.env.NASA_API_ROVER_PHOTO_URL!
const ROVER_MANIFEST_URL: string = process.env.NASA_API_ROVER_MANIFEST_URL!
const DATE_FORMAT: string = process.env.DATE_FORMAT!

export const getRoverPhotosByDate = async (date?: Date, apiKey?: string) => await axios.get(ROVER_PHOTOS_URL, {
    params: {
        earth_date: date! ? format(date, DATE_FORMAT) : undefined,
        api_key: apiKey
    }
})

export const getRoverManifiest = async (apiKey?: string) => await axios.get(ROVER_MANIFEST_URL, {
    params: {
        api_key: apiKey
    }
})