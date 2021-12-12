"use strict";
var Client;
(function (Client) {
    console.log("Client aktiv.");
    const url = "http://127.0.0.1:3000";
    const path = "/convertDate";
    const sendButton = document.getElementById("sendButton");
    const dateInput = document.getElementById("dateIn");
    sendButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        send();
    });
    async function send() {
        document.getElementById("clientDate").innerText = dateInput.value;
        // Auslesen des DateInputs und umwandeln in string
        let dateString = JSON.stringify(new Date(dateInput.value));
        console.log(dateString);
        //In URL und Query umwandeln
        let query = new URLSearchParams(dateString);
        let urlWithQuery = url + path + "?date=" + query;
        console.log(urlWithQuery);
        let response = await fetch(urlWithQuery); // Senden und warten
        let responseText = await response.text(); // Antwort
        console.log(responseText);
        document.getElementById("resp-head").innerText = "Server-Antwort:";
        document.getElementById("resp").innerText = responseText;
    }
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map