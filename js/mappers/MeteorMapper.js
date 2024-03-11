const buildMeteorEntity = (meteorStatistic) => {
    
    closeApprochDates = []
    relativeVelocityKmPerSeconds = []
    const closeApproachData = meteorStatistic.close_approach_data
    if (closeApproachData !== undefined) {
        closeApproachData.forEach((approachData) => {
            closeApprochDates.push(approachData.close_approach_date_full)

            const relativeVelocity = approachData.relative_velocity
            if (relativeVelocity !== undefined) {
                relativeVelocityKmPerSeconds.push(relativeVelocity.kilometers_per_second)
            }
        })
    }

    const estimatedDameter = meteorStatistic.estimated_diameter
    return {
        id: meteorStatistic.id,
        name: meteorStatistic.name,
        diameter_meters: estimatedDameter !== undefined ? estimatedDameter.meters : undefined,
        is_potentially_hazardous_asteroid: meteorStatistic.is_potentially_hazardous_asteroid,
        close_approach_date_full: closeApprochDates.length > 0 ? closeApprochDates : undefined,
        relative_velocity_in_km_per_second: relativeVelocityKmPerSeconds.length > 0 ? relativeVelocityKmPerSeconds : undefined,
    }
}

module.exports = { buildMeteorEntity }