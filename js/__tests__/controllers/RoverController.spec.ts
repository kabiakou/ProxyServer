import { getRecentPhoto, getRoverForm, getRecentPhotoRoverForm } from '../../controllers/RoverController'
import { getRecentPhoto as getRecPhoto } from '../../services/RoverService'
import { createRequest, createResponse } from 'node-mocks-http'

jest.mock('../../services/RoverService')

const ERROR = 'Error'
const LINK = 'Recent photo link'
const RENDER_RESENT_PHOTO = 'recent-photo'
const RENDER_ROVER_FORM = 'rover-form'

const mockReq = createRequest()
const mockRes = createResponse()
const next = jest.fn()
const mockGetRecPhoto = getRecPhoto as jest.MockedFunction<typeof getRecPhoto>

const userDto = {
    userId: 'userId',
    userName: 'userName',
    apiKey: 'apiKey'
}

const formParams = {
    userIdLabel: 'User Id:',
    userNameLabel: 'User name:',
    userApiKeyLabel: 'User Api key:'
}

const renderParams = {
    recentPhotoLink: `${LINK}`,
    userId: 'userId',
    userName: 'userName'
}

beforeAll(() => {
    mockRes.redirect = jest.fn()
    mockRes.render = jest.fn()
    mockReq.body = {
        user_id: 'userId',
        user_name: 'userName',
        api_key: 'apiKey',
    }
})

describe('getRecentPhoto function', () => {
    it('redirect recent photo by link', async () => {
        // given
        mockGetRecPhoto.mockResolvedValue(LINK)
        // when
        await getRecentPhoto(mockReq, mockRes, next)
        // then
        expect(mockGetRecPhoto).toHaveBeenCalled()
        expect(mockRes.redirect).toHaveBeenCalled()

        expect(mockGetRecPhoto).toHaveBeenCalledWith(userDto)
        expect(mockRes.redirect).toHaveBeenCalledWith(LINK)
        expect(mockRes.statusCode).toEqual(200)
    })

    it('getRecentPhoto throw exception', async () => {
        // given
        mockGetRecPhoto.mockImplementation(() => { throw new Error(ERROR) })
        // when
        await getRecentPhoto(mockReq, mockRes, next)
        // then
        expect(mockGetRecPhoto).toHaveBeenCalled()
        expect(mockRes.redirect).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()

        expect(mockGetRecPhoto).toHaveBeenCalledWith(userDto)
        expect(next).toHaveBeenCalledWith(new Error(ERROR))
    })
})

describe('getRoverForm function', () => {
    it('return form', async () => {
        // when
        await getRoverForm(mockReq, mockRes, next)
        // then
        expect(mockRes.render).toHaveBeenCalled()

        expect(mockRes.render).toHaveBeenCalledWith(RENDER_ROVER_FORM, formParams)
    })

    it('render throw exception', async () => {
        // given
        const mockRender = mockRes.render as jest.MockedFunction<typeof mockRes.render>
        mockRender.mockImplementation(() => { throw new Error(ERROR) })
        // when
        await getRoverForm(mockReq, mockRes, next)
        // then
        expect(mockRender).toHaveBeenCalled()
        expect(next).toHaveBeenCalled()

        expect(mockRes.render).toHaveBeenCalledWith(RENDER_ROVER_FORM, formParams)
        expect(next).toHaveBeenCalledWith(new Error(ERROR))
    })
})

describe('getRecentPhotoRoverForm function', () => {
    it('render recent photo', async () => {
        // given
        mockGetRecPhoto.mockResolvedValue(LINK)
        // when
        await getRecentPhotoRoverForm(mockReq, mockRes, next)
        // then
        expect(mockGetRecPhoto).toHaveBeenCalled()
        expect(mockRes.render).toHaveBeenCalled()

        expect(mockGetRecPhoto).toHaveBeenCalledWith(userDto)
        expect(mockRes.render).toHaveBeenCalledWith(RENDER_RESENT_PHOTO, renderParams)
        expect(mockRes.statusCode).toEqual(200)
    })

    it('getRecentPhoto throw error', async () => {
        // given
        mockGetRecPhoto.mockImplementation(() => { throw new Error(ERROR) })
        // when
        await getRecentPhotoRoverForm(mockReq, mockRes, next)
        // then
        expect(mockGetRecPhoto).toHaveBeenCalled()
        expect(mockRes.render).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()

        expect(mockGetRecPhoto).toHaveBeenCalledWith(userDto)
        expect(next).toHaveBeenCalledWith(new Error(ERROR))
    })
})