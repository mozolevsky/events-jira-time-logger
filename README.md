# events-jira-time-logger
EJTL (events jira time logger) helps you transfer events from google calendar to the jira and log time in meetings task

Motivation: to speed up time logging process

How to set up: 
1. bin/log -> choose in cli General actions -> Other -> Initial set up
2. Add connection with google-calendar <br>
-- go to `https://developers.google.com/calendar/quickstart/nodejs` <br>
-- go to 'Enable the Google Calendar API' --> Create --> DOWNLOAD CLIENT CONFIGURATION <br>
-- put content from downloaded `credentials.json` in the file `security/calendar-credentials.json` <br>
3. Fill the jira connection file in `security/jira-credentials.json` with your actual data <br>

```
{
    "host": "jira.some-domain.com",
    "username": "user",
    "password": "12345"
}

```
4. Fill a general settings in `settings/general.json` <br>
taskKey - task to where log time from calendar events <br>
excludedSummaries - tasks with those titles will be skipped during logging <br>

```
{
    "taskKey": "MEETINGS",
    "excludedSummaries": ["Excluded meeting 1", "Excluded meeting 2"]
}

```

How to use: <br>
1. yarn log-time<br>
2. follow CLI commands <br>
