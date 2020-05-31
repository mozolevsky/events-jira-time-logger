const inquirer = require('inquirer')
// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const { logEventsTime } = require('.')
const {
    validateDate,
    createEmptySettingFiles,
    getCurrentWorkWeekPeriod,
} = require('./utils')

const questions = [
    {
        type: 'list',
        name: 'mainAction',
        message: 'General actions',
        choices: [
            {
                name: 'Log time for period',
                value: 'logTime',
            },
            {
                name: 'Log current week',
                value: 'logCurrentWeek',
            },
            {
                name: 'Other',
                value: 'other',
            },
        ],
    },
    {
        type: 'input',
        name: 'startDate',
        message: "Enter start date e.g. '2020-05-11'",
        validate: validateDate,
        when: (answers) => answers.mainAction === 'logTime',
    },
    {
        type: 'input',
        name: 'endDate',
        message: "Enter end date e.g. '2020-05-12'",
        validate: validateDate,
        when: (answers) => answers.startDate !== undefined,
    },
    {
        type: 'list',
        name: 'otherOperation',
        message: 'General actions > other actions',
        when: (answers) => answers.mainAction === 'other',
        choices: [
            {
                name: 'Initial set up',
                value: 'initialSetUp',
            },
        ],
    },
    {
        type: 'confirm',
        name: 'currentWeekLogging',
        message: 'Confirm week logging?',
        when: (answers) => answers.mainAction === 'logCurrentWeek',
    },
]

inquirer
    .prompt(questions)
    .then(({ startDate, endDate, otherOperation, currentWeekLogging }) => {
        if (startDate && endDate) {
            console.log('Logging ...'.yellow)
            logEventsTime(startDate, endDate)
                .then(() => console.log('Time was logged successfully'.green))
                .catch(console.log)
        }

        if (otherOperation === 'initialSetUp') {
            createEmptySettingFiles()
        }

        if (currentWeekLogging) {
            const [start, end] = getCurrentWorkWeekPeriod()

            console.log('Logging ...'.yellow)
            logEventsTime(start, end)
                .then(() => console.log('Time was logged successfully'.green))
                .catch(console.log)
        }
    })
    .catch(console.log)
