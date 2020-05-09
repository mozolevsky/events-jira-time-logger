const fs = require('fs')

const getJiraCredentials = () => {
    const path = './security/jira-credentials.json'

    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}))
    } else {
        console.log('File jira-credentials.json was not found')
    }
}

module.exports = {
    getJiraCredentials
}
