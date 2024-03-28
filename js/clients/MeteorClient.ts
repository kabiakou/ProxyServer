import axios, { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import { MeteorsWithinPeriodResponse } from '../models/MeteorModels'

const API_KEY = process.env.NASA_API_KEY
const FEED_URl = process.env.NASA_API_FEED_URL!
const DATE_FORMAT = process.env.DATE_FORMAT!

export const getMeteorsWithinPeriod = async (startDate?: Date, endDate?: Date): Promise<AxiosResponse<MeteorsWithinPeriodResponse, any>> =>
    await axios.get(FEED_URl, {
        params: {
            start_date: startDate! ? format(startDate, DATE_FORMAT) : undefined,
            end_date: endDate! ? format(endDate, DATE_FORMAT) : undefined,
            api_key: API_KEY
        }
    })