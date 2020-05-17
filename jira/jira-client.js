const JiraClient = require('jira-connector')
const {getJiraCredentials} = require('./utils')
const {getGeneralSettings} = require('../utils')

const {host, username, password} = getJiraCredentials()
const jira = new JiraClient({
    host,
    basic_auth: {
        username,
        password
    }
})

const updateWorkLog = (issueKey, {timeSpentSeconds, comment, started}) => {
    return jira.issue.addWorkLog({
        issueKey: issueKey,
        worklog: {
            comment,
            started,
            timeSpentSeconds
        }
    })
}

const getWorklog = (issueKey) => {
    return jira.issue.getWorkLogs({issueKey})
}

const updatePeriodWorkLog = async events => {

    if (!events.length) {
        throw new Error(('There are no events for time log'.yellow))
    }

    const {taskKey} = getGeneralSettings()

    for (const event of events) {
      await updateWorkLog(taskKey, {
        comment: event.summary,
        started: `${event.date}T00:00:00.000-0700`,
        timeSpentSeconds: event.duration
      }).then(res => {
          console.log(`${event.date} - ${event.summary} - [DONE]`)
      }).catch(console.log)
    }
  }

module.exports = {
    updatePeriodWorkLog,
    getWorklog
}
