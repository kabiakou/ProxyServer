import { getRoverPhotosByDate, getRoverManifiest } from '../clients/RoverClient'
import { UserDto } from '../dtos/UserDto'

export const getRecentPhoto = async (userDto: UserDto): Promise<string> => {
    const { apiKey } = userDto
    const { photo_manifest } = await getRoverManifiest(apiKey)
    const { photos } = await getRoverPhotosByDate(photo_manifest.max_date, apiKey)

    return photos.pop()!.img_src
}