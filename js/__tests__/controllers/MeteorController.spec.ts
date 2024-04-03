import { getMeteors } from '../../controllers/MeteorController'
import { getMeteorsData } from '../../services/MeteorService'
import { MeteorPerDateResponse } from '../../models/MeteorModels'
import { createRequest, createResponse } from 'node-mocks-http'
import { MeteorPerDateDto } from '../../dtos/MeteorPerDateDto'
import { MeteorDto } from '../../dtos/MeteorDto'
import withoutWereDangerous from '../resources/controllers/WithoutWereDangerous.json'
import wereDangerousIsFalse from '../resources/controllers/WereDangerousIsFalse.json'
import wereDangerousIsTrue from '../resources/controllers/WereDangerousIsTrue.json'

jest.mock('../../services/MeteorService')

const EMPTY_PAGE = 'empty-meteor-response.html'
const INDEX_PAGE = 'index.html'
const ERROR = 'Error'

const mockReq = createRequest()
const mockRes = createResponse()
const next = jest.fn()
const mockGetMeteorsData = getMeteorsData as jest.MockedFunction<typeof getMeteorsData>
let meteorDto: MeteorDto

beforeAll(() => {
    mockRes.render = jest.fn()
    mockReq.query = {
        start_date: '2024-03-13',
        end_date: '2024-03-16'
    }
    const meteorQueryRequest = {
        start_date: '2024-03-13',
        end_date: '2024-03-16'
    }
    meteorDto = new MeteorDto(meteorQueryRequest)
})

describe('getMeteors function', () => {
    it('return empty data', async () => {
        // given
        mockGetMeteorsData.mockResolvedValue({} as MeteorPerDateResponse)
        // when
        await getMeteors(mockReq, mockRes, next)
        // then
        expect(mockGetMeteorsData).toHaveBeenCalled()
        expect(mockRes.render).toHaveBeenCalled()

        expect(mockGetMeteorsData).toHaveBeenCalledWith(meteorDto)
        expect(mockRes.render).toHaveBeenCalledWith(EMPTY_PAGE)
        expect(mockRes.statusCode).toEqual(200)
    })
})

describe('getMeteors function', () => {
    it('return data without were_dangerous request param', async () => {
        // given
        meteorDto.wereDangerous = false

        mockGetMeteorsData.mockResolvedValue(buildMeteorPerDateResponse())
        // when
        await getMeteors(mockReq, mockRes, next)
        // then
        expect(mockGetMeteorsData).toHaveBeenCalled()
        expect(mockRes.render).toHaveBeenCalled()

        expect(mockGetMeteorsData).toHaveBeenCalledWith(meteorDto)
        expect(mockRes.render).toHaveBeenCalledWith(INDEX_PAGE, withoutWereDangerous)
        expect(mockRes.statusCode).toEqual(200)
    })
})

describe('getMeteors function', () => {
    it('return data if were_dangerous request param is false', async () => {
        // given
        mockReq.query.were_dangerous = 'false'
        meteorDto.wereDangerous = false

        mockGetMeteorsData.mockResolvedValue(buildMeteorPerDateResponse())
        // when
        await getMeteors(mockReq, mockRes, next)
        // then
        expect(mockGetMeteorsData).toHaveBeenCalled()
        expect(mockRes.render).toHaveBeenCalled()

        expect(mockGetMeteorsData).toHaveBeenCalledWith(meteorDto)
        expect(mockRes.render).toHaveBeenCalledWith(INDEX_PAGE, wereDangerousIsFalse)
        expect(mockRes.statusCode).toEqual(200)
    })
})

describe('getMeteors function', () => {
    it('return data if were_dangerous request param is true', async () => {
        // given
        mockReq.query.were_dangerous = 'true'
        meteorDto.wereDangerous = true

        mockGetMeteorsData.mockResolvedValue(buildMeteorPerDateResponse())
        // when
        await getMeteors(mockReq, mockRes, next)
        // then
        expect(mockGetMeteorsData).toHaveBeenCalled()
        expect(mockRes.render).toHaveBeenCalled()

        expect(mockGetMeteorsData).toHaveBeenCalledWith(meteorDto)
        expect(mockRes.render).toHaveBeenCalledWith(INDEX_PAGE, wereDangerousIsTrue)
        expect(mockRes.statusCode).toEqual(200)
    })
})

describe('getMeteors function', () => {
    it('getMeteors throw error', async () => {
        // given
        mockGetMeteorsData.mockImplementation(() => { throw new Error(ERROR) })
        // when
        await getMeteors(mockReq, mockRes, next)
        // then
        expect(mockGetMeteorsData).toHaveBeenCalled()
        expect(mockRes.render).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()

        expect(mockGetMeteorsData).toHaveBeenCalledWith(meteorDto)
        expect(next).toHaveBeenCalledWith(new Error(ERROR))
    })
})

const buildMeteorPerDateResponse = (): MeteorPerDateResponse => {
    const meteorPerDateDto = new MeteorPerDateDto('16-03-2024', [meteorEntity])
    return {
        meteors: [meteorPerDateDto],
        were_dangerous: false
    }
}

const meteorEntity = {
    id: 'id',
    name: 'name',
    diameter_meters: {
        estimated_diameter_min: 1,
        estimated_diameter_max: 2
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_date_full: ['12-05-2024'],
    relative_velocity_in_km_per_second: ['1234']
}