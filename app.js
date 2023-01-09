const express = require("express");
const path = require("path");
const app = express();

//variables
let month = 0;
let date = 0;
let year = 0;
let cells = [];
let today = new Date();
let todayIndex = []; //to hold index of cells indicating today

//Set up routers
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//Router with function call
app.get("/calendar", function (req, res) {

  //get params if exist, req.params = ":" req.query = "?
  if (req.query.month && req.query.year) {
    month = parseInt(req.query.month);
    year = parseInt(req.query.year);
  }
  else{ //request has no params, default to 0
    month = 0;
    year = 0;
  }

  //initialize calendar using input
  initCalendar();

  //anchor links for arrows
  const backmonth    = `<a class="button" href="/calendar?month=${month==1?12:month-1}&year=${month==1?year-1:year}">&lt;</a>`;
  const forwardmonth = `<a class="button" href="/calendar?month=${month==12?1:month+1}&year=${month==12?year+1:year}">&gt</a>`;
  const backyear     = `<a class="button" href="/calendar?month=${month}&year=${year-1}">&lt;&lt;</a>`;
  const forwardyear  = `<a class="button" href="/calendar?month=${month}&year=${year+1}">&gt;&gt;</a>`;

  //render calendar to ejs
  res.render("calendar", {
    backmonth, forwardmonth, backyear, forwardyear,
    monthString, year, cells,todayIndex,
  });
});

//listen on port number
app.listen(3000);

//Functions /////////////////////////////////////////////////////////////////////

function isToday(m, d, y) {
  return (
    m == today.getMonth() + 1 &&
    y == today.getFullYear() &&
    d == today.getDate()
  );
}

function initCalendar(){

  //if no input, set today
  if(month == 0 || year == 0){
    month = today.getMonth() + 1;
    date = today.getDate();
    year = today.getFullYear();
  }
  buildCells();
}

function buildCells(){

  // Calculate the last day of the month taking leap year into account
  // How would you do this using the js Date object?
  if (month === 4 || month === 6 || month === 9 || month === 11)
  lastDay = 30;
  else if (month !== 2)
  lastDay = 31;
  else if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
  lastDay = 29;
  else
  lastDay = 28;
      
  let firstDayOfMonth = new Date(year, month-1, 1);
  let dday = 1 - firstDayOfMonth.getDay();

  // When done is true, stop printing the calendar.
  let done = false;

  //find month name
  const monthNames = ["", "January", "February", "March", "April",
          "May", "June", "July", "August", "September", "October",
          "November", "December"];
  monthString = monthNames[month];

  //reset cells for new dates
  cells = []; 
  todayIndex = [];

  //construct cells
  for (let row = 0; !done; ++row) {
    cells[row] = [];
    for (let colday = 0; colday <= 6 && !done; ++colday, ++dday) {
      if (dday < 1){
        cells[row][colday] = " ";
      }
      else{
        cells[row][colday] = dday;

        //check if cells is today
        if(isToday(month, dday, year)){
          todayIndex[0] = row;
          todayIndex[1] = colday;
        }
      }
      done = (dday === lastDay);
    }
  }
}