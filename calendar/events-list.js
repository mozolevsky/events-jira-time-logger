const {google} = require('googleapis');

function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) {
        return console.log('The API returned an error: ' + err);
      }
      
      const events = res.data.items;
      if (events.length) {
        events.map((event, i) => {
          console.log(`${JSON.stringify(event)}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
  }

module.exports = listEvents
