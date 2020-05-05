const fs = require('fs');
const listEvents = require('./calendar/events-list')
const authorize = require('./calendar/calendar-autorize')
const {getWorklog, updateWorkLog} = require('./jira/jira-client')

// Load client secrets from a local file.
fs.readFile('./security/credentials.json', (err, content) => {
  if (err) return console.log('Please add the credentials.json file', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), auth => listEvents(auth, getEventsInfo));
});

const getEventsInfo = eventsInfo => {
  console.log(eventsInfo)
}


updateWorkLog('jira task number', {
  comment: "I did some work here.",
  started: "2020-05-05T06:53:06.605+0000",
  timeSpentSeconds: 3600
})
.then(res => console.log(res))
.catch(err => console.log(err))

getWorklog('jira task number')
  .then(res => console.log(res))
  .catch(err => console.log(JSON.parse(err)))
