const {google} = require('googleapis');
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

module.exports = listEvents
