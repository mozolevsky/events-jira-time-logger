const {google} = require('googleapis');
const {calculateDurationHours} = require('./utils') 

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
  events.map((event, i) => {
    const duration = calculateDurationHours(event)

    console.log(`${event.start.dateTime} - ${event.summary} - ${duration}`);
  });
}

module.exports = listEvents
