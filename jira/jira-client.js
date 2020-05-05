const JiraClient = require('jira-connector')

// Basic Authentication (Deprecated)
const jira = new JiraClient({
    host: "jira.exigeninsurance.com",
    basic_auth: {
        //TODO: read credentials from a secure file
        username: "login",
        password: "password"
    }
});

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
