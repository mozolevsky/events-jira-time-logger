const JiraClient = require('jira-connector')
const {getJiraCredentials} = require('./utils')

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
    for (const event of events) {
      await updateWorkLog('ITL-3', {
        comment: event.summary,
        started: `${event.date}T06:53:06.605+0000`,
        timeSpentSeconds: event.duration
      })
    }
  }

module.exports = {
    updatePeriodWorkLog,
    getWorklog
}
