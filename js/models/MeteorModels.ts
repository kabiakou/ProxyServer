export interface MeteorQueryRequest {
    start_date?: string
    end_date?: string
    count?: string
    were_dangerous?: string
}

export interface NearEarthObjects {
    [key: string]: MeteorsDataItem[]
}

export interface MeteorsDataItem {
    id: string;
    name: string;
    estimated_diameter: {
        meters: {
            estimated_diameter_min: number
            estimated_diameter_max: number
        };
    };
    is_potentially_hazardous_asteroid: boolean
    close_approach_data: CloseApproachDataItem[]
}

export interface CloseApproachDataItem {
    close_approach_date_full: string
    relative_velocity: {
        kilometers_per_second: string
    };
}

export interface MeteorEntity {
    id: string
    name: string
    diameter_meters?: {
        estimated_diameter_min?: number
        estimated_diameter_max?: number
    }
    is_potentially_hazardous_asteroid?: boolean
    close_approach_date_full?: string[]
    relative_velocity_in_km_per_second?: string[]
}