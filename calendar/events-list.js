const {google} = require('googleapis')
const fs = require('fs')
const authorize = require('./calendar-autorize')
const {extractRequiredInfo, filterBySummary} = require('./utils') 

const calendarSettings = {
  calendarId: 'primary',
  timeMin: (new Date('2020-05-04')).toISOString(),
  timeMax: (new Date('2020-05-05')).toISOString(),
  singleEvents: true,
  orderBy: 'startTime',
}

function listEvents(auth, cb) {
    const calendar = google.calendar({version: 'v3', auth});

    calendar.events.list(calendarSettings, (err, res) => {
      if (err) {
        return console.log('The API returned an error: ' + err);
      }
      
      const events = res.data.items;
      if (events.length) {
        const eventsInfo = extractEventsInfo(events)
        cb(eventsInfo)
      } else {
        console.log('No upcoming events found.');
      }
    });
  }

function extractEventsInfo(events) {
  return events
    .filter(event => filterBySummary(event, []))
    .map(extractRequiredInfo)
}

const getEventsInfo = () => new Promise((resolve, reject) => {
  fs.readFile('./security/calendar-credentials.json', (err, content) => {
    if (err) {
      reject('Please add the credentials.json file')
    }
    
    authorize(JSON.parse(content), auth => listEvents(auth, resolve))
  })
})

module.exports = getEventsInfo
