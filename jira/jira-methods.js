/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const path = require('path')
const { getGeneralSettings } = require('../utils')

const updateWorkLog = (issueKey, { timeSpentSeconds, comment, started }) => {
  const jira = require('./jira-client')

  return jira.issue.addWorkLog({
    issueKey,
    worklog: {
      comment,
      started,
      timeSpentSeconds,
    },
  })
}

const getWorklog = (issueKey) => {
  const jira = require(path.join(__dirname, './jira-client'))
  return jira.issue.getWorkLogs({ issueKey })
}

const updatePeriodWorkLog = async (events) => {
  if (!events.length) {
    throw new Error(('There are no events for time log'.yellow))
  }

  const { taskKey } = getGeneralSettings()

  for (const event of events) {
    await updateWorkLog(taskKey, {
      comment: event.summary,
      started: `${event.date}T00:00:00.000-0700`,
      timeSpentSeconds: event.duration,
    }).then(() => {
      console.log(`${event.date} - ${event.summary} - [DONE] - time: ${event.duration / 60}m`)
    }).catch(console.log)
  }
}

module.exports = {
  updatePeriodWorkLog,
  getWorklog,
}
