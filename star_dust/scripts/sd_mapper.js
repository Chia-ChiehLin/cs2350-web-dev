"use strict";

/*

   Planisphere Script
   Author: Chia Chieh Lin
   Date:   22/July/2023

*/

// Set variable to today's date
var thisTime = new Date();

// Set date to Locale string
var timeStr = thisTime.toLocaleString();

// Add date to HTML
document.getElementById("timeStamp").innerHTML = timeStr;

// Determine the sky map to use for the current date and time
var thisHour = thisTime.getHours();
var thisMonth = thisTime.getMonth();
var mapNum = ((thisMonth * 2) + thisHour) % 24;

// Get correct sky map for date
var imgStr = "<img src='images/sd_sky" + mapNum + ".png' />";

// Insert the HTML code for the inline image of the sky amp
document.getElementById("planisphere").insertAdjacentHTML('afterbegin', imgStr);
