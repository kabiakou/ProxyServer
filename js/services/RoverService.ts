import { getRoverPhotosByDate, getRoverManifiest } from '../clients/RoverClient'
import { UserDto } from '../dtos/UserDto'

export const getRecentPhoto = async (userDto: UserDto): Promise<string> => {
    const { apiKey } = userDto
    const { data: manifest } = await getRoverManifiest(apiKey)
    const { data: photosByDate } = await getRoverPhotosByDate(manifest.photo_manifest.max_date, apiKey)

    return photosByDate.photos.pop()?.img_src!
}