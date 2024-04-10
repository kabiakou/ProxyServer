import { getRecentPhoto } from '../../services/RoverService'
import { getRoverPhotosByDate, getRoverManifiest } from '../../clients/RoverClient'
import { AxiosPromise } from 'axios'
import { RoverManifestResponse, RoverPhotosByDateResponse } from '../../models/RoverModels'

jest.mock('../../clients/RoverClient')

const ERROR = 'Error'
const API_KEY = 'apiKey'

const mockGetRoverManifiest = getRoverManifiest as jest.MockedFunction<typeof getRoverManifiest>
const mockGetRoverPhotosByDate = getRoverPhotosByDate as jest.MockedFunction<typeof getRoverPhotosByDate>

let roverManifiestPromise: AxiosPromise<RoverManifestResponse>
let roverPhotosByDatePromise: AxiosPromise<RoverPhotosByDateResponse>

const userDto = {
    userId: 'userId',
    userName: 'userName',
    apiKey: 'apiKey'
}

beforeAll(() => {
    roverManifiestPromise = buildRoverManifiestPromise()
    roverPhotosByDatePromise = buildRoverPhotosByDatePromise()
})

describe('getRecentPhoto function', () => {
    it('get recent photo', async () => {
        // given
        mockGetRoverManifiest.mockResolvedValue(roverManifiestPromise)
        mockGetRoverPhotosByDate.mockResolvedValue(roverPhotosByDatePromise)
        // when
        const photoLink = await getRecentPhoto(userDto)
        // then
        expect(mockGetRoverManifiest).toHaveBeenCalled()
        expect(mockGetRoverPhotosByDate).toHaveBeenCalled()

        expect(mockGetRoverManifiest).toHaveBeenCalledWith(API_KEY)
        expect(mockGetRoverPhotosByDate).toHaveBeenCalledWith('2024-03-03', 'apiKey')
        expect(photoLink).toEqual('2222')
    })

    it('getRoverManifiest function throw error', async () => {
        // given
        mockGetRoverManifiest.mockImplementation(() => { throw new Error(ERROR) })
        // when
        try {
            await getRecentPhoto(userDto)
        } catch (error) {
            expect(error).toEqual(new Error(ERROR))
        }
        // then
        expect(mockGetRoverManifiest).toHaveBeenCalled()
        expect(mockGetRoverPhotosByDate).not.toHaveBeenCalled()

        expect(mockGetRoverManifiest).toHaveBeenCalledWith(API_KEY)
    })
})

const buildRoverPhotosByDatePromise = () => {
    const photoLinks = [{ img_src: '1111' }, { img_src: '2222' }]
    const roverPhotosByDateResponse = { photos: photoLinks }
    return Promise.resolve({ data: roverPhotosByDateResponse }) as AxiosPromise<RoverPhotosByDateResponse>
}

const buildRoverManifiestPromise = () => {
    const roverManifiest = {
        photo_manifest: {
            max_date: '2024-03-03'
        }
    }
    return Promise.resolve({ data: roverManifiest }) as AxiosPromise<RoverManifestResponse>
}