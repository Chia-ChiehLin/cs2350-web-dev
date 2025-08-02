"use strict";

window.addEventListener("load", function() {
    var body = document.body;
    initializeStyles(body);
    populateAboutSection();
    createCollectionButton();
    setupImageClick();
});

function initializeStyles(body) {
    var styles = {
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: "0",
        position: "relative"
    };

    Object.assign(body.style, styles);
}

function populateAboutSection() {
    var nickname = document.getElementById("nickname");
    var favorites = document.getElementById("favorites");
    var hometown = document.getElementById("hometown");

    nickname.textContent = "Jack";
    favorites.textContent = "Tennis, Watching Movie";
    hometown.textContent = "New Taipei, Taiwan";

    var listItems = document.querySelectorAll("li");
    listItems.forEach(function(item) {
        item.className = "listitem";
    });

    var listItemStyle = document.createElement("style");
    listItemStyle.textContent = ".listitem { color: red; }";
    document.head.appendChild(listItemStyle);
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
    document.body.appendChild(button);
}

function createCollectionButton() {
    var clickHandler = function() {
        window.location.href = "mycollection.html";
    };

    createButton("Go to My Collection Page", "mycollection-button", clickHandler);
}

function setupImageClick() {
    var num = 1;
    var image = document.createElement("img");
    var imageContainer = document.createElement("div");
    var h1 = document.querySelector("h1");

    image.src = "images/me" + num + ".jpg";
    image.style.width = "280px";
    image.style.border = "10px solid transparent";
    image.style.borderImage = "linear-gradient(45deg, #f06, #3cf) 1";
    image.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
    image.className = "profile-picture";
    image.addEventListener("click", changePic);

    imageContainer.className = "profile-picture-container";
    imageContainer.appendChild(image);
    h1.appendChild(imageContainer);

    function changePic() {
        num = num === 3 ? 1 : 3;
        image.src = "images/me" + num + ".jpg";
    }
}
