const JiraClient = require('jira-connector')
const { getJiraCredentials } = require('./utils')

const { host, username, password } = getJiraCredentials()
const jira = new JiraClient({
    host,
    basic_auth: {
        username,
        password,
    },
})

module.exports = jira
