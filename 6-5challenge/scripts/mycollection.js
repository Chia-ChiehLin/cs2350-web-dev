"use strict";

window.addEventListener("load", function() {
    var tableBody = document.querySelector("#collectionTable tbody");

    var books = [
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', alreadyRead: false },
        { title: '1984', author: 'George Orwell', alreadyRead: true },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', alreadyRead: false },
        { title: 'Pride and Prejudice', author: 'Jane Austen', alreadyRead: true },
        { title: 'The Catcher in the Rye', author: 'J.D. Salinger', alreadyRead: false },
        { title: 'Brave New World', author: 'Aldous Huxley', alreadyRead: true },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', alreadyRead: false },
        { title: 'Moby-Dick', author: 'Herman Melville', alreadyRead: false },
        { title: 'The Odyssey', author: 'Homer', alreadyRead: true },
        { title: 'War and Peace', author: 'Leo Tolstoy', alreadyRead: false }
    ];

    books.forEach(function(book) {
        var row = document.createElement("tr");

        var titleCell = createTableCell(book.title);
        var authorCell = createTableCell(book.author);
        var readCell = createReadCell(book);

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(readCell);

        tableBody.appendChild(row);
    });

    function createTableCell(content) {
        var cell = document.createElement("td");
        cell.textContent = content;
        return cell;
    }

    function createReadCell(book) {
        var cell = document.createElement("td");
        var readImage = document.createElement("img");
        readImage.src = book.alreadyRead ? "images/read.png" : "images/unread.png";
        readImage.style.width = "20px";
        readImage.addEventListener("click", function() {
            book.alreadyRead = !book.alreadyRead;
            readImage.src = book.alreadyRead ? "images/read.png" : "images/unread.png";
        });
        cell.appendChild(readImage);
        return cell;
    }

    createAboutButton();
    applyTableStyles();
});

function createAboutButton() {
    var aboutButton = createButton("Go to About Me Page", "aboutme-button", function() {
        window.location.href = "aboutme.html";
    });

    document.body.appendChild(aboutButton);
}

function applyTableStyles() {
    var style = document.createElement("style");
    style.innerHTML = `
        h1, h2 {
            text-align: center;
            color: black;
        }
        table {
            border-collapse: collapse;
            margin: 0 auto;
            color: black;
            border: 1px solid black;
        }
        table th {
            border: 1px solid black;
            padding: 5px 10px;
            background-color: rgb(150, 150, 150);
            color: black;
        }
        table td {
            border: 1px solid black;
            padding: 5px 10px;
            color: black;
        }
    `;
    document.head.appendChild(style);
}

function createButton(text, className, clickHandler) {
    var button = document.createElement("button");
    button.textContent = text;
    button.className = className;

    Object.assign(button.style, {
        position: "absolute",
        top: "10px",
        left: "10px",
        padding: "5px 10px",
        backgroundColor: "#ccc",
        border: "1px solid #999",
        borderRadius: "5px",
        zIndex: "1"
    });

    button.onclick = clickHandler;
    return button;
}
