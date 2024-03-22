import axios from 'axios'
import { format } from 'date-fns'

const API_KEY: string = process.env.NASA_API_KEY!
const FEED_URl: string = process.env.NASA_API_FEED_URL!
const DATE_FORMAT: string = process.env.DATE_FORMAT!

export const getMeteorsWithinPeriod = async (startDate?: Date, endDate?: Date) => await axios.get(FEED_URl, {

    params: {
        start_date: startDate! ? format(startDate, DATE_FORMAT) : undefined,
        end_date: endDate! ? format(endDate, DATE_FORMAT) : undefined,
        api_key: API_KEY
    }
})