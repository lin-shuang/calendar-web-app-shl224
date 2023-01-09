# Homework Assignment 4 - Calendar Web App

- Author: Shuang Lin
- Email: shuanglin3359@gmail.com

### CSE 264 – Web Systems Programming,

- Due Sunday, September 25th, 11:59pm
- No extensions under any circumstances.

### Objective

- To get some experience using Node, Express and EJS by creating a calendar.

Example: calendar.png in the folder

### Overview

The project is to combine several of the demos that we have gone over in class to create an html calendar like the one shown above. The above calendar is shown in black and white, but your calendar will be in color. As you can see, the month and year of the calendar are shown on the top line of the table and take up three columns. Clicking the single arrows (&lt; &gt;) will display a calendar either one month before or one month after the current calendar. Clicking the double arrows (&lt;&lt; &gt;&gt;) will display a calendar for the same month, one year before or later. If the displayed calendar happens to be the current month, then the background color for today&#39;s cell must be a different color than the rest of the days in order to highlight it. In all cases the page is redisplayed and the new calendar replaces the old one.

### Instructions & steps

Use color.adobe.com (or some similar tool) to select a color scheme for your calendar.

Make sure you have node (and npm) installed.

Open a terminal/powershell window and from the project folder, run npm init.
Npm will give you a series of prompts for which you will give reasonable answers. When in doubt, hit return. When you&#39;re finished you&#39;ll have an initial package.json file for your project. I’m not so concerned with the answers since you can always edit the package.json file in VSC and change whatever you want later on.

From the terminal run:

- npm install express --save
- npm install ejs --save

This will install the express and ejs modules into the node_modules folder in your project and also add references to them in the package.json file (check this out). Saving the references is important so that you can delete the node_modules folder, zip up the project folder and install the project somewhere else. We have added node_modules to the .gitignore file so that it will not be committed to your repo and pushed to github. When the grader clones your repo he will run npm install from the project folder to reinstall the modules into node_modules.

Create a views folder in your project and put a single file inside it named calendar.ejs. Edit this file and enter a template html page with a body consisting of a single table containing the boilerplate (unchanging) parts of the calendar. Include two ejs tags, one for the month/year header (eg. &quot;February 2019&quot;) and one for the rows of the calendar with the day numbers. Add a &lt;title&gt; (how about Calendar?) and a style element with any styles you need. Commit and push to github.

Edit the app.js script to create an express router for the path /calendar which will get the parameters month and year from the query string and pass them to a function that will create a calendar and send it to the browser by rendering the calendar view/template and sending it the month/year header string and the &lt;tr&gt; rows for the calendar body. You may (should) create the calendar function by copying the code from the calendar.js example and altering it to create an html calendar like the one shown shown and described above. If the user of the calendar app doesn&#39;t specify a month and year then use the current month. For example:

localhost:3000/calendar/month=10&amp;year=2022

should display a calendar for October, 2022

localhost:3000/calendar

should display a calendar for the current month.

Edit the four arrow links (&lt;a&gt; tags )in the header of the calendar to
request the appropriate calendar (one month/year forward/backward).

Commit and push to github.

### Testing

Run node app.js from the terminal window.

- Test the calendar from your browser both with and without specifying
  the month and year in the query. For the current month, make sure
  today’s day is highlighted.
- Test each of the four arrow buttons.

Commit and push the final version of the calendar to github.

Of course, you may commit and push as many times as you like, but you should
do at least the ones specified above.
