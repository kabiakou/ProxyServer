const CLOSE_APPROACH_DATA_FIELD = "close_approach_data"
const CLOSE_APPROACH_DATE_FULL_FIELD = "close_approach_date_full"
const KILOMETERS_PER_SECOND_FIELD = "kilometers_per_second"
const RELATIVE_VELOCITY_FIELD = "relative_velocity"
const ESTIMATED_DIAMETER_FIELD = "estimated_diameter"
const ID_FIELD = "id"
const NAME_FIELD = "name"
const METERS_FIELD = "meters"
const IS_POTENTIALLY_HAZARDOUS_ASTEROID_FIELD = "is_potentially_hazardous_asteroid"

const buildMeteorEntity = (meteorStatistic) => {
    closeApprochDates = []
    relativeVelocityKmPerSeconds = []
    const closeApproachData = meteorStatistic[CLOSE_APPROACH_DATA_FIELD]
    if (closeApproachData !== undefined) {
        closeApproachData.forEach((approachData) => {
            closeApprochDates.push(approachData[CLOSE_APPROACH_DATE_FULL_FIELD])

            const relativeVelocity = approachData[RELATIVE_VELOCITY_FIELD]
            if (relativeVelocity !== undefined) {
                relativeVelocityKmPerSeconds.push(relativeVelocity[KILOMETERS_PER_SECOND_FIELD])
            }
        })
    }

    const estimatedDameter = meteorStatistic[ESTIMATED_DIAMETER_FIELD]
    return {
        id: meteorStatistic[ID_FIELD],
        name: meteorStatistic[NAME_FIELD],
        diameter_meters: estimatedDameter !== undefined ? estimatedDameter[METERS_FIELD] : undefined,
        is_potentially_hazardous_asteroid: meteorStatistic[IS_POTENTIALLY_HAZARDOUS_ASTEROID_FIELD],
        close_approach_date_full: closeApprochDates.length > 0 ? closeApprochDates : undefined,
        relative_velocity_in_km_per_second: relativeVelocityKmPerSeconds.length > 0 ? relativeVelocityKmPerSeconds : undefined,
    }
}

module.exports = { buildMeteorEntity }