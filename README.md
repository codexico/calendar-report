calendar-report
===============

Send email report from calendar events


    So one day the managers decided that they need a daily status report.

    This script reads you calendar and send it daily to your boss.


Instructions:
--------------

https://developers.google.com/apps-script/overview

1) Visit http://script.google.com to open the script editor. (You'll need to be signed in to your Google account.) If this is the first time you've been to script.google.com, you'll be redirected to a page that introduces Apps Script. Click Start Scripting to proceed to the script editor.

2) A welcome screen will ask what kind of script you want to create. Click Blank Project or Close.

3) Delete any code in the script editor and paste in the code on script.ga.js.

4) Create a doc with the email recipients and put the id in config.id, please dont format the doc,
    or just write the recipients in config.recipient

5) https://developers.google.com/apps-script/understanding_triggers?#TimeTriggers

To run a script at a time or times you designate:

- From the Script Editor, choose Resources > Current project's triggers. You see a panel with the message No triggers set up. Click here to add one now.
- Click the link that says No triggers set up. Click here to add one now.

- Under Run, select the function you want executed on schedule.

    **yesterdayReport** or **todayReport**

- Under Events, select Time-driven.
- On the first drop-down list that appears, select Week timer, Day timer, Hour timer, or Minutes timer, or Specific date and time. Depending on which you select, you see one or more additional lists or a text box. To test the trigger and your function, you might want to pick a short duration so that you can see the execution without having to wait hours or days.
- If you picked Week timer, select a day of the week and time of day.
- If you picked Day timer, select an hour.
- If you picked Hour timer, select an interval of hours.
- If you picked Minutes timer, select an interval of minutes.
- If you picked Specific date and time, enter a date in YYYY-MM-DD HH:MM format.
- Click Save.
- To ensure that the script runs at the correct time for a particular time zone, click File > Properties, select a time zone, and click Save.
