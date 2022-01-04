"use strict";
var a8;
(function (a8) {
    const url = "http://127.0.0.1:2222";
    const path = "/concertEvents";
    const out = document.querySelector("#out");
    const eventnameIn = document.getElementById("eventnameIn");
    const interpretIn = document.getElementById("interpretIn");
    const priceIn = document.getElementById("priceIn");
    const dateIn = document.getElementById("dateIn");
    const entryAdder = document.querySelector("#entryAdder");
    let entryCount = 0;
    // Mache nach dem Laden folgendes:
    updateOnLoad();
    entryAdder.addEventListener("click", addEntry, false);
    // Neuer Eintrag
    function addEntry() {
        let _id = entryCount;
        let nameVal;
        let interpretVal;
        let priceVal;
        let dateVal;
        let inputerror = false;
        let event = {
            _id,
            nameVal,
            interpretVal,
            priceVal,
            dateVal
        };
        eventnameIn.setAttribute("style", "border-color: light-gray;");
        interpretIn.setAttribute("style", "border-color: light-gray;");
        priceIn.setAttribute("style", "border-color: light-gray;");
        dateIn.setAttribute("style", "border-color: light-gray;");
        try {
            // EventnameIn
            try {
                event.nameVal = document.getElementById("eventnameIn").value;
                if (event.nameVal === "") {
                    throw new Error;
                }
            }
            catch (error) {
                eventnameIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // InterpretIn
            try {
                event.interpretVal = document.getElementById("interpretIn").value;
                if (event.interpretVal === "") {
                    throw new Error;
                }
            }
            catch (error) {
                interpretIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // PriceIn
            try {
                event.priceVal = parseInt(document.getElementById("priceIn").value);
                if (event.priceVal.toString() === "NaN") {
                    throw new Error;
                }
            }
            catch (error) {
                priceIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // DateIn
            try {
                event.dateVal = new Date(document.getElementById("dateIn").value);
                if (event.dateVal.toString() === "Invalid Date") {
                    throw new Error;
                }
            }
            catch (error) {
                dateIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // Falls ein oder mehrere Eingabefehler vorhanden sind
            if (inputerror) {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("FEHLER BEI DER EINGABE");
        }
        display(event);
        saveEntry(event);
    }
    // Erstellt die dynamischen Elemente
    function display(event) {
        // Erzeugen eines Eintragselement mit id und Button
        let entry = document.createElement("div");
        entry.setAttribute("id", `${entryCount}`);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";
        // Erzeugen des Eintragsinhalt
        let date = document.createElement("td");
        date.textContent = `${event.dateVal.toLocaleDateString()} | ${event.dateVal.toLocaleTimeString()} Uhr`;
        let eventname = document.createElement("td");
        eventname.textContent = event.nameVal;
        let interpret = document.createElement("td");
        interpret.textContent = event.interpretVal;
        let price = document.createElement("td");
        price.textContent = `${event.priceVal.toString()},-`;
        // Positionieren der erzeugten Elemente
        out.appendChild(entry);
        entry.appendChild(date);
        entry.appendChild(eventname);
        entry.appendChild(interpret);
        entry.appendChild(price);
        entry.appendChild(deleteButton);
        // Dem Löschkopf eine Funktion zuweisen
        deleteButton.addEventListener("click", function () { deleteEntry(entry); });
        entryCount++;
    }
    // Eintrag löschen
    function deleteEntry(parentElement) {
        console.log("Eintrag gelöscht.");
        out.removeChild(parentElement);
    }
    // Sendet einen POST-Befehl
    async function saveEntry(event) {
        let eventstring = JSON.stringify(event);
        console.log("Attempting to save in database:");
        console.log(eventstring);
        await fetch(url + path, {
            method: "post",
            body: eventstring
        });
    }
    // Sendet einen GET-Request
    async function updateOnLoad() {
        let response = await fetch(url + path, { method: "get" });
        let responseText = await response.text();
        console.log(responseText);
        // Setze entryCount auf _id+1, danit nichts überschrieben wird
        //entryCount = event._id;
    }
})(a8 || (a8 = {}));
//# sourceMappingURL=events.js.map