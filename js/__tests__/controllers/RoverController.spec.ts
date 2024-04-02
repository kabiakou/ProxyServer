import { getRecentPhoto } from '../../controllers/RoverController'
import { getRecentPhoto as getRecPhoto } from '../../services/RoverService'
import { createRequest, createResponse } from 'node-mocks-http'

jest.mock('../../services/RoverService')

const mockReq = createRequest()
mockReq.body = {
    user_id: 'userId',
    user_name: 'userName',
    api_key: 'apiKey',
}
const mockRes = createResponse()
mockRes.render = jest.fn()
const next = jest.fn()

const mockGetRecPhoto = getRecPhoto as jest.MockedFunction<typeof getRecPhoto>

it('getRecentPhoto return recent link', async () => {
    // given
    mockGetRecPhoto.mockResolvedValue({} as string)
    // when
    await getRecentPhoto(mockReq, mockRes, next)
    // then
    expect(mockGetRecPhoto).toHaveBeenCalled()
    // expect(mockRes.render).toHaveBeenCalledWith('empty-meteor-response.html')
    // expect(mockRes.statusCode).toEqual(200)
})
