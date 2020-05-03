const {google} = require('googleapis');
const {extractRequiredInfo, filterBySummary} = require('./utils') 

const calendarSettings = {
  calendarId: 'primary',
  timeMin: (new Date('2020-04-27')).toISOString(),
  timeMax: (new Date('2020-05-01')).toISOString(),
  singleEvents: true,
  orderBy: 'startTime',
}

function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});

    calendar.events.list(calendarSettings, (err, res) => {
      if (err) {
        return console.log('The API returned an error: ' + err);
      }
      
      const events = res.data.items;
      if (events.length) {
        extractEventsInfo(events)
      } else {
        console.log('No upcoming events found.');
      }
    });
  }

function extractEventsInfo(events) {
  const finalEvents = events
    .filter(event => filterBySummary(event, []))
    .map(extractRequiredInfo)

    console.log(finalEvents)
}

module.exports = listEvents
