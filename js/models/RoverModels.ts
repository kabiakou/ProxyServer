export interface UserQueryRequest {
    user_id?: string
    user_name?: string
    api_key?: string
}

export interface RoverManifestResponse {
    photo_manifest: {
        max_date: string
    }
}

export interface RoverPhotosByDateResponse {
    photos: Photo[]
}

export interface Photo {
    img_src: string
}