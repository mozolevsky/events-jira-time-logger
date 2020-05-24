const fs = require('fs')
const path = require('path')

const getJiraCredentials = () => {
    const JCPath = path.join(__dirname, '../security/jira-credentials.json')

    if (fs.existsSync(JCPath)) {
        return JSON.parse(fs.readFileSync(JCPath, { encoding: 'utf-8' }))
    }
    console.log('File jira-credentials.json was not found')
}

module.exports = {
    getJiraCredentials,
}
