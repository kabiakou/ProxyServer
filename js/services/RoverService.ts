import { getRoverPhotosByDate, getRoverManifiest } from '../clients/RoverClient'

export const getRecentPhoto = async (userDto) => {
    const apiKey = userDto.apiKey
    const manifest = await getRoverManifiest(apiKey)
    const photosData = await getRoverPhotosByDate(manifest.data.photo_manifest.max_date, apiKey)
    const recentPhoto = photosData.data.photos.pop().img_src

    return recentPhoto
}