/**
 * Extracts a base info from an event
 * @param {Object} event - google calendar event
 */
function extractRequiredInfo(event) {
    /**
     * summary
     * duration in hours
     * event date
     */
    const duration = calculateDurationHours(event)
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
function calculateDurationHours(event) {
    const endTime = event.end && event.end.dateTime
    const startTime = event.start && event.start.dateTime

    return endTime && startTime ? (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60) : 0
}
/**
 * Filters list of event by params
 * @param {Object} event - calendar event
 * @param {string[]} excludedSummaries - array of event summaries for filtration
 */
function filterBySummary(event, excludedSummaries) {
    return !excludedSummaries.includes(event.summary)
}

module.exports = {
    extractRequiredInfo,
    filterBySummary
}

