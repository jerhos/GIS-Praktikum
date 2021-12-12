"use strict";
var Client;
(function (Client) {
    console.log("Client aktiv.");
    const url = "http://127.0.0.1:3000";
    const path = "/convertDate";
    const myForm = document.getElementById("form");
    const sendButton = document.getElementById("sendButton");
    const dateInput = document.getElementById("dateIn");
    sendButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        sendForm();
    });
    async function sendForm() {
        let dateIn = new Date(dateInput.value);
        let dateString = JSON.stringify(dateIn);
        console.log(dateString);
        //Senden
        let formData = new FormData(myForm);
        let test = JSON.stringify(myForm);
        console.log("Yooo " + test);
        //Formulardaten mit unserem Formular initialisieren.
        let query = new URLSearchParams(dateString);
        let urlWithQuery = url + path + "?date=" + dateString;
        console.log(urlWithQuery);
        /*
        Die QueryURL besteht aus der url selbst,
        aus dem gewünschten Pfad,
        einem Fragezeichen um zu kennzeichnen das jetzt Getparameter angehengt werden
        und der Get-Parametern (query.toString())
        */
        // let testresp: Response = await fetch();
        let response = await fetch(urlWithQuery); // Senden und warten
        let responseText = await response.text(); // Antwort
        console.log(responseText);
        document.getElementById("resp").innerText = responseText;
    }
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map