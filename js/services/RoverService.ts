import { getRoverPhotosByDate, getRoverManifiest } from '../clients/RoverClient'
import { UserDto } from '../dtos/UserDto'

export const getRecentPhoto = async (userDto: UserDto) => {
    const { apiKey } = userDto
    const manifest = await getRoverManifiest(apiKey)
    const photosData = await getRoverPhotosByDate(manifest.data.photo_manifest.max_date, apiKey)
    const recentPhoto = photosData.data.photos.pop().img_src

    return recentPhoto
}