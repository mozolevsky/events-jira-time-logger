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

module.exports = {
    updateWorkLog,
    getWorklog
}
