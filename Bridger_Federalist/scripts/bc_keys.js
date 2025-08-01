"use strict";

/*

   Author: Chia Chieh Lin
   Date:   30/July/2023

   Filename: bc_keys.js

   Functions
   =========
   
   findKeyWords()
      Locate the keywords in the article indicated by the <dfn> tag
      and add those keywords in alphabetical order to a keyword box.
      
   makeKeyStyles()
      Create an embedded style sheet for the keyword box.

      
   replaceWS(textStr)
      Replaces occurences of one or more consecutive white space
      characters with the "_" character.

*/

function initializeKeywordsBox() {
   var article = document.getElementById("doc");
   var myKeywordsList = createKeywordsList();
   var myKeywordsBox = createKeywordsBox();
   var sortedKeywords = findAndSortKeywords();
   findKeywords(myKeywordsList, sortedKeywords);
   myKeywordsBox.appendChild(myKeywordsList);
   article.prepend(myKeywordsBox);
   makeKeyStyles();
}

function createKeywordsList() {
   return document.createElement("ul");
}

function findKeywords(mykeywordsList, mykeywordsArray) {
   mykeywordsList.innerHTML = "";
   for (var i = 0; i < mykeywordsArray.length; i++) {
      var mykeywordLink = document.createElement("a");
      var linkID = replaceWS(mykeywordsArray[i]);
      var mykeywordListItem = document.createElement("li");
      mykeywordLink.textContent = mykeywordsArray[i];
      mykeywordListItem.appendChild(mykeywordLink);
      mykeywordsList.appendChild(mykeywordListItem);
      mykeywordLink.setAttribute("href", "#keyword_" + linkID);
   }
}

function createKeywordsBox() {
   var myKeywordsBox = document.createElement("div");
   var myKeywordsH1 = document.createElement("h1");
   myKeywordsBox.appendChild(myKeywordsH1);
   myKeywordsBox.setAttribute("id", "keywords");
   myKeywordsH1.textContent = "Keyword List";
   return myKeywordsBox;
}

function makeKeyStyles() {
   var asideStyle = document.createElement("style");
   document.head.appendChild(asideStyle);
   asideStyle.textContent = `
      div#keywords {
         border: 3px solid rgb(100, 100, 100);
         float: right;
         margin: 10px 0px 10px 10px;
         padding: 10px;
         width: 320px;
      }

      div#keywords ul li {
         line-height: 1.5em;
      }

      div#keywords ul li a {
         color: rgb(100, 100, 100);
         text-decoration: none;
      }

      div#keywords h1 {
         font-size: 2em;
         margin: 5px;
         text-align: center;
      }

      div#keywords ul {
         margin-left: 15px;
         font-size: 1.4em;
      }
   `;
}

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g, "_");
   return revText;
}

function findAndSortKeywords() {
   var myKeywordElems = document.querySelectorAll("dfn");
   var myKeywordsArray = [];
   for (var i = 0; i < myKeywordElems.length; i++) {
      myKeywordsArray.push(myKeywordElems[i].textContent);
      myKeywordElems[i].setAttribute("id", "keyword_" + linkID);
      var linkID = replaceWS(myKeywordsArray[i]);
   }
   myKeywordsArray.sort();
   return myKeywordsArray;
}

window.addEventListener("load", initializeKeywordsBox);

/*Supplied Functions*/

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}
