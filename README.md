# events-jira-time-logger
EJTL (events jira time logger) helps you transfer events from google calendar to the jira and log time in meetings task

Motivation: to log meetings time from the calendar to the jira every week is kind of time wasting. 

How to set up:
1. Add a package 
2. Add connection with google-calendar 
-- go to `https://developers.google.com/calendar/quickstart/nodejs`
-- go to 'Enable the Google Calendar API' --> Create --> DOWNLOAD CLIENT CONFIGURATION
-- put content from downloaded `credentials.json` in directory `security/calendar-credentials.json`
3. Fill the jira connection file in `security/jira-credentials.json` with your actual data

```
{
    "host": "jira.some-domain.com",
    "username": "user",
    "password": "12345"
}

```
4. Fill a general settings in `settings/general.json`
taskKey - task to where log time from calendar events
excludedSummaries - tasks with those summaries will be skipped during logging

```
{
    "taskKey": "MEETINGS",
    "excludedSummaries": ["Excluded meeting 1", "Excluded meeting 2"]
}

```

How to use: 
1. yarn log-events-time
2. follow CLI commands 
