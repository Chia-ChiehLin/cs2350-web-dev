"use strict";

/*

   Author: Chia Chieh Lin
   Date:   21/July/2023

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the title weekday rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

// create the current Date
var thisDay = new Date('July 21, 2023' );

// Add the table inside the div
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// create a function that generates the calendar table
function createCalendar(calDate) {
	var calendarHTML = "<table id='calendar_table'>";
	calendarHTML += calCaption(thisDay);
	calendarHTML += calWeekdayRow();
	calendarHTML += calDays(thisDay);
	calendarHTML += "</table>";
	return calendarHTML;
}

// create the caption for the calendar_table
function calCaption(calDate) {
	var monthName = [
      "January", 
      "February", 
      "March", 
      "April", 
      "May", 
      "June",
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
   ];

	// get current month
	var thisMonth = calDate.getMonth();

	// get current year
	var thisYear = calDate.getFullYear();

	return "<caption>" + monthName[thisMonth] + ' ' + thisYear + '</caption>';
}

// create top row with table headers that contain weekday names
function calWeekdayRow() {
	// array of weekdays
	var dayName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	var rowHTML = '<tr>';

	// loop through the array and create the tr elements
	for (var i = 0; i < dayName.length; i++) {
		rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
	}

	rowHTML += '</tr>';
	return rowHTML;
}

function daysInMonth(calDate) {
	// array of days in each month
	var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// get the month and year from the date
	var thisMonth = calDate.getMonth();
	var thisYear = calDate.getFullYear();

	// change February days to 29 when it's a leap year
	if (thisYear % 4 === 0) {
		if (thisYear % 100 != 0 || thisYear % 400 === 0) {
			dayCount[1] = 29;
		}
	}

	return dayCount[thisMonth];
}

function calDays(calDate) {
	// figure out what day the 1st is on
	var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
	var weekDay = day.getDay();

	// code the beginning blank days
	var htmlCode = "<tr>";
	for (var i = 0; i < weekDay; i++) {
		htmlCode += "<td></td>";
	}

	// add calendar days for each day of the month
	var totalDays = daysInMonth(calDate);

	var highlightDay = calDate.getDate();

	for (var i = 1; i <= totalDays; i++) {
		day.setDate(i);
		weekDay = day.getDay();

		if (weekDay === 0) htmlCode += "<tr>";

		if (i === highlightDay) {
			htmlCode += "<td class='calendar_dates' id='calendar_today'>" +
			i + dayEvent[i] + "</td>";
		} else {
			htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
		}

		if (weekDay === 6) htmlCode += "</tr>";
	}

	return htmlCode;
}

