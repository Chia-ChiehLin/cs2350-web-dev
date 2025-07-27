"use strict";

/*

   Author: Chia Chieh Lin
   Date:   23/July/2023

	
*/

// Set date
var thisDay = new Date("August 30, 2018");

// Get the date 14 days ahead
var endDate = new Date(thisDay.getTime() + 14 * 24 * 60 * 60 * 1000);

// Filter events within the time span
var upcomingEvents = eventDates.filter(eventDate => {
    var eventDateObj = new Date(eventDate);
    return thisDay <= eventDateObj && eventDateObj <= endDate;
});

// Generate the HTML code for the table
var tableHTML = `
    <table id='eventTable'>
        <caption>Upcoming Events</caption>
        <tr><th>Date</th><th>Event</th><th>Price</th></tr>
        ${upcomingEvents.map((eventDate, i) => {
            var eventDateObj = new Date(eventDate);
            var eventDay = eventDateObj.toDateString();
            var eventTime = eventDateObj.toLocaleTimeString();
            return `
                <tr>
                    <td>${eventDay} @ ${eventTime}</td>
                    <td>${eventDescriptions[i]}</td>
                    <td>${eventPrices[i]}</td>
                </tr>`;
        }).join('')}
    </table>`;

// Link table to eventList ID
document.getElementById("eventList").innerHTML = tableHTML;