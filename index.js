const getEventsInfo = require('./calendar/events-list')
const {getWorklog, updateWorkLog} = require('./jira/jira-client')


getEventsInfo({
  start: '2020-05-11',
  end: '2020-05-11'
}).then(events => {
  if (!events.length) {
    console.log('no events for logging')
  }

  console.log(events)
  updatePeriodWorkLog(events)

}).catch(console.log)


const updatePeriodWorkLog = async events => {
  for (const event of events) {
    await updateWorkLog('ITL-3', {
      comment: event.summary,
      started: `${event.date}T06:53:06.605+0000`,
      timeSpentSeconds: event.duration
    })
  }
} 

// getWorklog('GENESIS-38248')
//   .then(res => console.log(res))
//   .catch(err => console.log(JSON.parse(err)))
