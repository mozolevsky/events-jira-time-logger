const getEventsInfo = require('./calendar/events-list')
const { updatePeriodWorkLog } = require('./jira/jira-methods')

/**
 * Logs time from all events of certain period to a jira meetings task
 * @param {string} start date of the period in format '2020-05-11'
 * @param {string} end date of the period in format '2020-05-11'
 */
const logEventsTime = (start, end) => getEventsInfo({ start, end }).then(updatePeriodWorkLog)

module.exports = { logEventsTime }
