"use strict";

// arrays.js
// Part 1: Declare, Initialize and Display Arrays
const familyNames = ["Walter", "Sally", "Marcus", "Scott", "Carol", "John", "Julie"];
const relationships = ["Uncle", "Mother", "Father", "Brother", "Sister", "Cousin", "Cousin"];

const familyTable = document.createElement('table');
const tableHeaderRow = document.createElement('tr');
const nameHeader = document.createElement('th');
const relationshipHeader = document.createElement('th');
nameHeader.textContent = 'Name';
relationshipHeader.textContent = 'Relationship';
tableHeaderRow.appendChild(nameHeader);
tableHeaderRow.appendChild(relationshipHeader);
familyTable.appendChild(tableHeaderRow);

for (let i = 0; i < familyNames.length; i++) {
  const newRow = document.createElement('tr');
  const nameCell = document.createElement('td');
  const relationshipCell = document.createElement('td');
  nameCell.textContent = familyNames[i];
  relationshipCell.textContent = relationships[i];
  newRow.appendChild(nameCell);
  newRow.appendChild(relationshipCell);
  familyTable.appendChild(newRow);
}

document.getElementById('family').appendChild(familyTable);

// Part 2: Select Items From an Array
const colors = [];
colors.push("red", "green", "purple", "brown", "yellow", "pink", "blue", "orange");

const allColorsList = document.createElement('ul');
for (const color of colors) {
  const listItem = document.createElement('li');
  listItem.textContent = color;
  allColorsList.appendChild(listItem);
}
document.getElementById('allColors').appendChild(allColorsList);

const pColorsList = document.createElement('ul');
for (const color of colors) {
  if (color.startsWith('p')) {
    const listItem = document.createElement('li');
    listItem.textContent = color;
    pColorsList.appendChild(listItem);
  }
}
document.getElementById('pColors').appendChild(pColorsList);

const nonBColorsList = document.createElement('ul');
for (const color of colors) {
  if (!color.startsWith('b')) {
    const listItem = document.createElement('li');
    listItem.textContent = color;
    nonBColorsList.appendChild(listItem);
  }
}
document.getElementById('nonBColors').appendChild(nonBColorsList);

const filteredColorsList = document.createElement('ul');
const filteredColors = colors.filter(color => color.includes('n'));
for (const color of filteredColors) {
  const listItem = document.createElement('li');
  listItem.textContent = color;
  filteredColorsList.appendChild(listItem);
}
document.getElementById('filterColors').appendChild(filteredColorsList);


// Part 3: Sorting Arrays
const stringArray = ["Hotel", "Alpha", "Zebra", "Tagno", "Apple", "Banana", "Carrot"];
const numberArray = [7, -5, 18, -13, 25, 3, -10];

// Display the original, mixed-up arrays
const twoArraysParagraph = document.createElement('p');
twoArraysParagraph.textContent = `String Array: ${stringArray.toString()}`;
document.getElementById('twoArrays').appendChild(twoArraysParagraph);

const numberArrayParagraph = document.createElement('p');
numberArrayParagraph.textContent = `Number Array: ${numberArray.toString()}`;
document.getElementById('twoArrays').appendChild(numberArrayParagraph); // Updated ID

// Mixed-up String Array
const mixedStringArray = stringArray.slice().sort(() => Math.random() - 0.5);
const mixedStringArrayParagraph = document.createElement('p');
mixedStringArrayParagraph.textContent = `Mixed-up String Array: ${mixedStringArray.toString()}`;
document.getElementById('twoArrays').appendChild(mixedStringArrayParagraph);

// Mixed-up Number Array
const mixedNumberArray = numberArray.slice().sort(() => Math.random() - 0.5);
const mixedNumberArrayParagraph = document.createElement('p');
mixedNumberArrayParagraph.textContent = `Mixed-up Number Array: ${mixedNumberArray.toString()}`;
document.getElementById('twoArrays').appendChild(mixedNumberArrayParagraph);

// Sorted String Array
const sortedStringArray = stringArray.slice().sort();
const sortedStringArrayParagraph = document.createElement('p');
sortedStringArrayParagraph.textContent = `Sorted String Array: ${sortedStringArray.toString()}`;
document.getElementById('sortedArrays').appendChild(sortedStringArrayParagraph);

// Sorted Number Array
const sortedNumberArray = numberArray.slice().sort((a, b) => a - b);
const sortedNumberArrayParagraph = document.createElement('p');
sortedNumberArrayParagraph.textContent = `Sorted Number Array: ${sortedNumberArray.toString()}`;
document.getElementById('sortedArrays').appendChild(sortedNumberArrayParagraph);

// Sorted Number Array Numerically
const sortedNumberArrayNumerically = numberArray.slice().sort((a, b) => a - b);
const sortedNumberArrayNumericallyParagraph = document.createElement('p');
sortedNumberArrayNumericallyParagraph.textContent = `Sorted Number Array (Numerically): ${sortedNumberArrayNumerically.toString()}`;
document.getElementById('aSortedNumbers').appendChild(sortedNumberArrayNumericallyParagraph);


// Part 4: Add Dates to the Footer Section
const lastModified = document.lastModified;
const currentDate = new Date();

const lastModifiedH4 = document.createElement('h4');
lastModifiedH4.textContent = `Last Modified: ${lastModified}`;
const currentDateH4 = document.createElement('h4');
currentDateH4.textContent = `Current Date: ${currentDate}`;

document.getElementById('dates').appendChild(lastModifiedH4);
document.getElementById('dates').appendChild(currentDateH4);
