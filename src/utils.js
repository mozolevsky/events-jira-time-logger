/* eslint-disable no-unused-vars */
const fs = require('fs')
const colors = require('colors')
const path = require('path')

const getPath = (pathStr) => path.join(__dirname, pathStr)

const validateDate = (dateString) => {
    const reg = /^\d{4}-\d{2}-\d{2}$/
    if (reg.test(dateString)) {
        const parts = dateString.split('-')

        if (Number(parts[1] > 12 || Number(parts[2]) > 31)) {
            console.log(' Rule: Month < 12 | Day < 31'.red)
            return false
        }
        return true
    }
    console.log(' Rule: date format 0000-00-00'.red)
    return false
}

const getGeneralSettings = () => {
    const pathToSettings = getPath('./settings/general.json')

    if (fs.existsSync(pathToSettings)) {
        return JSON.parse(
            fs.readFileSync(pathToSettings, { encoding: 'utf-8' })
        )
    }

    throw new Error("Can't find ./settings/general.json")
}

const createEmptySettingFiles = () => {
    ;[
        {
            pathToFile: './security/calendar-credentials.json',
            content:
                'Put here credential from https://developers.google.com/calendar/quickstart/nodejs',
        },
        {
            pathToFile: './security/jira-credentials.json',
            content: {
                host: '',
                username: '',
                password: '',
            },
        },
        {
            pathToFile: './settings/general.json',
            content: {
                taskKey: '',
                excludedSummaries: [],
            },
        },
    ].forEach(({ pathToFile, content }) => {
        if (fs.existsSync(pathToFile)) {
            console.log(`File ${pathToFile} already exists`)
        } else {
            fs.writeFileSync(getPath(pathToFile), JSON.stringify(content), {
                encoding: 'utf-8',
            })
            console.log(`File: ${pathToFile} created`)
        }
    })
}

const getShortISOString = (date) => date.split('T')[0]

// Current week: test implementation
const getCurrentWorkWeekPeriod = () => {
    const firstDay = 1
    const lastDay = 5
    const currentDay = new Date().getDay()

    const startOffset = -((currentDay && currentDay - firstDay) || -1)
    const endOffset = lastDay - currentDay

    return [startOffset, endOffset]
        .map((offset) => new Date().setDate(new Date().getDate() + offset))
        .map((date) => new Date(date).toISOString())
        .map(getShortISOString)
}

module.exports = {
    validateDate,
    getGeneralSettings,
    createEmptySettingFiles,
    getCurrentWorkWeekPeriod,
}
