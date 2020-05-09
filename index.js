const getEventsInfo = require('./calendar/events-list')
const {getWorklog, updateWorkLog} = require('./jira/jira-client')


getEventsInfo().then(console.log).catch(console.log)


updateWorkLog('jira task number', {
  comment: "I did some work here.",
  started: "2020-05-05T06:53:06.605+0000",
  timeSpentSeconds: 3600
})
.then(res => console.log(res))
.catch(err => console.log(err))

getWorklog('GENESIS-38248')
  .then(res => console.log(res))
  .catch(err => console.log(JSON.parse(err)))
