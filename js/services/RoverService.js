const requestUtils = require('../clients/RoverClient')

const getRecentPhoto = async (userDto) => {
    const apiKey = userDto.apiKey
    const manifest = await requestUtils.getRoverManifiest(apiKey)
    const photosData = await requestUtils.getRoverPhotosByDate(manifest.data.photo_manifest.max_date, apiKey)
    const recentPhoto = photosData.data.photos.pop().img_src

    return recentPhoto
}

module.exports = { getRecentPhoto }