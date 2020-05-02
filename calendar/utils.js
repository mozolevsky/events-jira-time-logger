/**
 * Extracts a base info from an event
 * @param {Object} event - google calendar event
 */
function extractRequiredInfo(event) {

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
 * @param {Object[]} filters - params for filtering
 * @param {string} filters[].field - field to filter by
 * @param {string} filters[].values[] - if a field has a one of the following value in this case event will be filtered
 */
function eventsFilter(filters) {

}

module.exports = {
    extractRequiredInfo,
    calculateDurationHours,
    eventsFilter
}

