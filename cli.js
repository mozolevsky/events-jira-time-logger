const inquirer = require('inquirer')
const {logEventsTime} = require('./')

const questions = [
    {
        type: 'list',
        name: 'command',
        message: 'Choose operation',
        choices: [
            {
                name: 'Log time for period',
                value: 'logTime'
            },
            {
                name: 'Change settings',
                value: 'changeSettings'
            }
        ]
    },
    {
        'type': 'input',
        'name': 'startDate',
        'message': "Enter start date e.g. '2020-05-11'",
        'when': (answers) => answers.command === 'logTime'
    },
    {
        'type': 'input',
        'name': 'endDate',
        'message': "Enter end date e.g. '2020-05-12'",
        'when': (answers) => answers.startDate !== undefined
    }
]

inquirer.prompt(questions).then(({startDate, endDate}) => {
    if (startDate && endDate) {
        console.log('Logging ...')
        logEventsTime(startDate, endDate).then(res => console.log('Time was logged successfully')).catch(console.log)
    }

}).catch(console.log)
