import { getMeteors } from '../../controllers/MeteorController'
import { getMeteorsData } from '../../services/MeteorService'
import { MeteorPerDateResponse } from '../../models/MeteorModels'
import { createRequest, createResponse } from 'node-mocks-http'
import { MeteorPerDateDto } from '../../dtos/MeteorPerDateDto'

jest.mock('../../services/MeteorService')

const mockReq = createRequest()
mockReq.query = {
    start_date: '2024-03-13',
    end_date: '2024-03-16'
}
const mockRes = createResponse()
mockRes.render = jest.fn()
const next = jest.fn()

const mockGetMeteorsData = getMeteorsData as jest.MockedFunction<typeof getMeteorsData>

it('getMeteors return empty data', async () => {
    // given
    mockGetMeteorsData.mockResolvedValue({} as MeteorPerDateResponse)
    // when
    await getMeteors(mockReq, mockRes, next)
    // then
    expect(mockGetMeteorsData).toHaveBeenCalled()
    expect(mockRes.render).toHaveBeenCalled()

    expect(mockRes.render).toHaveBeenCalledWith('empty-meteor-response.html')
    expect(mockRes.statusCode).toEqual(200)
})

it('getMeteors return data without were_dangerous request param', async () => {
    // given
    const option = { "meteorsData": [{ "date": "16-03-2024", "meteors": [{ "close_approach_date_full": ["12-05-2024"], "diameter_meters": { "estimated_diameter_max": 2, "estimated_diameter_min": 1 }, "id": "id", "is_potentially_hazardous_asteroid": false, "name": "name", "relative_velocity_in_km_per_second": ["1234"] }] }], "wereDangerous": { "param": undefined, "value": false } }

    mockGetMeteorsData.mockResolvedValue(buildMeteorPerDateResponse())
    // when
    await getMeteors(mockReq, mockRes, next)
    // then
    expect(mockGetMeteorsData).toHaveBeenCalled()
    expect(mockRes.render).toHaveBeenCalled()

    expect(mockRes.render).toHaveBeenCalledWith('index.html', option)
    expect(mockRes.statusCode).toEqual(200)
})

it('getMeteors return data if were_dangerous request param is false', async () => {
    // given
    const option = { "meteorsData": [{ "date": "16-03-2024", "meteors": [{ "close_approach_date_full": ["12-05-2024"], "diameter_meters": { "estimated_diameter_max": 2, "estimated_diameter_min": 1 }, "id": "id", "is_potentially_hazardous_asteroid": false, "name": "name", "relative_velocity_in_km_per_second": ["1234"] }] }], "wereDangerous": { "param": "false", "value": false } }
    mockReq.query.were_dangerous = 'false'

    mockGetMeteorsData.mockResolvedValue(buildMeteorPerDateResponse())
    // when
    await getMeteors(mockReq, mockRes, next)
    // then
    expect(mockGetMeteorsData).toHaveBeenCalled()
    expect(mockRes.render).toHaveBeenCalled()

    expect(mockRes.render).toHaveBeenCalledWith('index.html', option)
    expect(mockRes.statusCode).toEqual(200)
})

it('getMeteors return data if were_dangerous request param is true', async () => {
    // given
    const option = { "meteorsData": [{ "date": "16-03-2024", "meteors": [{ "close_approach_date_full": ["12-05-2024"], "diameter_meters": { "estimated_diameter_max": 2, "estimated_diameter_min": 1 }, "id": "id", "is_potentially_hazardous_asteroid": false, "name": "name", "relative_velocity_in_km_per_second": ["1234"] }] }], "wereDangerous": { "param": "true", "value": false } }
    mockReq.query.were_dangerous = 'true'

    mockGetMeteorsData.mockResolvedValue(buildMeteorPerDateResponse())
    // when
    await getMeteors(mockReq, mockRes, next)
    // then
    expect(mockGetMeteorsData).toHaveBeenCalled()
    expect(mockRes.render).toHaveBeenCalled()

    expect(mockRes.render).toHaveBeenCalledWith('index.html', option)
    expect(mockRes.statusCode).toEqual(200)
})

it('getMeteors throw error', async () => {
    // given
    mockGetMeteorsData.mockImplementation(() => {
        throw new Error('Something goes wrong in getMeteors function')
    })
    // when
    await getMeteors(mockReq, mockRes, next)
    // then
    expect(mockGetMeteorsData).toHaveBeenCalled()
    expect(mockRes.render).not.toHaveBeenCalled()

    expect(next).toHaveBeenCalledWith(new Error('Something goes wrong in getMeteors function'))
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