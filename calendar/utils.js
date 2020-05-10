/**
 * Extracts a base info from an event
 * @param {Object} event - google calendar event
 */
const extractRequiredInfo = event => {
    /**
     * summary
     * duration in hours
     * event date
     */
    const duration = calculateDuration(event)
    const {summary, start: {dateTime}} = event

    const shortISOString = dateTime.split('T')[0]

    return {
        date: shortISOString,
        duration,
        summary
    }
}

/**
 * Calculates event duration
 * @param {Date} startDate - event start date
 * @param {Date} endDate - event end date
 */
const calculateDuration = event => {
    const endTime = event.end && event.end.dateTime
    const startTime = event.start && event.start.dateTime

    return endTime && startTime ? (new Date(endTime) - new Date(startTime)) / 1000 : 0
}
/**
 * Filters list of event by params
 * @param {Object} event - calendar event
 * @param {string[]} excludedSummaries - array of event summaries for filtration
 */
const filterBySummary = (event, excludedSummaries) => !excludedSummaries.includes(event.summary)

const getISODateWithOffset = (dateStr, offset) => {
    let date = new Date(dateStr)

    if (offset && typeof offset === 'number') {
        date.setDate(date.getDate() + offset)
    }

    return date.toISOString()
}

module.exports = {
    extractRequiredInfo,
    filterBySummary,
    getISODateWithOffset
}

