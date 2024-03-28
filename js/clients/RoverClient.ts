import axios, { AxiosPromise } from 'axios'
import { format } from 'date-fns'
import { RoverManifestResponse, RoverPhotosByDateResponse } from '../models/RoverModels'

const ROVER_PHOTOS_URL = process.env.NASA_API_ROVER_PHOTO_URL!
const ROVER_MANIFEST_URL = process.env.NASA_API_ROVER_MANIFEST_URL!
const DATE_FORMAT = process.env.DATE_FORMAT!

export const getRoverPhotosByDate = async (date?: string, apiKey?: string): AxiosPromise<RoverPhotosByDateResponse> =>
    await axios.get(ROVER_PHOTOS_URL, {
        params: {
            earth_date: date! ? format(date, DATE_FORMAT) : undefined,
            api_key: apiKey
        }
    })

export const getRoverManifiest = async (apiKey?: string): AxiosPromise<RoverManifestResponse> =>
    await axios.get(ROVER_MANIFEST_URL, {
        params: {
            api_key: apiKey
        }
    })