/* 
Github Pages implementation of the original script.
No Node.js, no express, no Ajax calls.
Pure html, css, and js.
*/

let month = 0;
let year = 0;
let cells = [];
let today = new Date();
let todayIndex = [];

document.addEventListener("DOMContentLoaded", function () {
    initCalendar();
    renderCalendar();

    document.getElementById("back-year").addEventListener("click", function () {
        navigateCalendar(-12);
    });

    document.getElementById("back-month").addEventListener("click", function () {
        navigateCalendar(-1);
    });

    document.getElementById("forward-month").addEventListener("click", function () {
        navigateCalendar(1);
    });

    document.getElementById("forward-year").addEventListener("click", function () {
        navigateCalendar(12);
    });

    document.getElementById("current-month-button").addEventListener("click", function () {
        // Set the calendar to the current month
        month = today.getMonth() + 1;
        year = today.getFullYear();
        initCalendar();
        renderCalendar();
    });
});

function navigateCalendar(monthOffset) {
    // Update the month and year
    month += monthOffset;
    if (month < 1) {
        month += 12;
        year -= 1;
    } else if (month > 12) {
        month -= 12;
        year += 1;
    }

    initCalendar();
    renderCalendar();
}

function renderCalendar() {
    document.getElementById("calendar").innerHTML = "";
    const headerRow = document.createElement("tr");
    ["SU", "MO", "TU", "WE", "TH", "FR", "SA"].forEach(day => {
        const th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    });
    document.getElementById("calendar").appendChild(headerRow);

    cells.forEach(rowData => {
        const row = document.createElement("tr");
        rowData.forEach(day => {
            const td = document.createElement("td");
            td.textContent = day !== " " ? day : "";
            if (isToday(month, day, year)) {
                td.id = "today";
            }
            row.appendChild(td);
        });
        document.getElementById("calendar").appendChild(row);
    });

    // Update the current month and year display
    document.getElementById("current-month-year").textContent = `${getMonthName(month)} ${year}`;
}

function isToday(m, d, y) {
    return (
        m === today.getMonth() + 1 &&
        y === today.getFullYear() &&
        d === today.getDate()
    );
}

function initCalendar() {
    if (month === 0 || year === 0) {
        month = today.getMonth() + 1;
        year = today.getFullYear();
    }
    buildCells();
}

function buildCells() {
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthString = monthNames[month];
    let lastDay;

    if (month === 4 || month === 6 || month === 9 || month === 11)
        lastDay = 30;
    else if (month !== 2)
        lastDay = 31;
    else if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
        lastDay = 29;
    else
        lastDay = 28;

    const firstDayOfMonth = new Date(year, month - 1, 1);
    let dday = 1 - firstDayOfMonth.getDay();
    let done = false;

    cells = [];
    todayIndex = [];

    for (let row = 0; !done; ++row) {
        cells[row] = [];
        for (let colday = 0; colday <= 6 && !done; ++colday, ++dday) {
            if (dday < 1) {
                cells[row][colday] = " ";
            } else {
                cells[row][colday] = dday;
                if (isToday(month, dday, year)) {
                    todayIndex[0] = row;
                    todayIndex[1] = colday;
                }
            }
            done = (dday === lastDay);
        }
    }
}

function getMonthName(month) {
    const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
}