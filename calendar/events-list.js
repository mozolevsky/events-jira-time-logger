const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')
const authorize = require('./calendar-autorize')
const { extractRequiredInfo, filterBySummary, getISODateWithOffset } = require('./utils')
const { getGeneralSettings } = require('../utils')

/**
 *
 * @param {string} start - start of the period in a format '2020-05-04'
 * @param {string} end - edd of the period in a format '2020-05-04'
 */
const calendarSettings = (start, end) => ({
  calendarId: 'primary',
  timeMin: getISODateWithOffset(start),
  timeMax: getISODateWithOffset(end, 1),
  singleEvents: true,
  orderBy: 'startTime',
})

const extractEventsInfo = (events) => {
  const filters = getGeneralSettings().excludedSummaries

  return events
    .filter((event) => filterBySummary(event, filters))
    .map(extractRequiredInfo)
}

const listEvents = (auth, cb, period) => {
  const calendar = google.calendar({ version: 'v3', auth })

  calendar.events.list(calendarSettings(period.start, period.end), (err, res) => {
    if (err) {
      return console.log(`The API returned an error: ${err}`)
    }

    const events = res.data.items
    if (events.length) {
      const eventsInfo = extractEventsInfo(events)
      cb(eventsInfo)
    } else {
      console.log('No upcoming events found.')
    }
  })
}

const getEventsInfo = (period) => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, '../security/calendar-credentials.json'), (err, content) => {
    if (err) {
      reject(new Error('Please add the credentials.json file'))
    }

    authorize(JSON.parse(content), (auth) => listEvents(auth, resolve, period))
  })
})

module.exports = getEventsInfo
