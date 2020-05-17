const inquirer = require('inquirer')
const colors = require('colors')
const {logEventsTime} = require('./')
const {validateDate, createEmptySettingFiles} = require('./utils')

const questions = [
    {
        type: 'list',
        name: 'mainAction',
        message: 'General actions',
        choices: [
            {
                name: 'Log time for period',
                value: 'logTime'
            },
            {
                name: 'Other',
                value: 'other'
            }
        ]
    },
    {
        'type': 'input',
        'name': 'startDate',
        'message': "Enter start date e.g. '2020-05-11'",
        'validate': validateDate,
        'when': answers => answers.mainAction === 'logTime'
    },
    {
        'type': 'input',
        'name': 'endDate',
        'message': "Enter end date e.g. '2020-05-12'",
        'validate': validateDate,
        'when': answers => answers.startDate !== undefined
    },
    {
        'type': 'list',
        'name': 'otherOperation',
        'message': "General actions > other actions",
        'when': answers => answers.mainAction === 'other',
        choices: [
            {
                name: 'Initial set up',
                value: 'initialSetUp'
            },
            {
                name: 'Change general settings',
                value: 'changeGeneralSettings'
            }
        ]
    }
]

inquirer.prompt(questions).then(({startDate, endDate, mainAction, otherOperation, ...rest}) => {
    if (startDate && endDate) {
        console.log('Logging ...'.yellow)
        logEventsTime(startDate, endDate).then(res => console.log('Time was logged successfully'.green)).catch(console.log)
    }

    if (otherOperation === 'initialSetUp') {
        createEmptySettingFiles()
    }
   

}).catch(console.log)
