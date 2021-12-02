"use strict";
var a4;
(function (a4) {
    // Tabelleneintrag
    class EventEntry {
        eventname;
        interpret;
        price;
        date;
        constructor(e, i, p, d) {
            this.eventname = e;
            this.interpret = i;
            this.price = p;
            this.date = d;
        }
    }
    // Variablen und so
    const out = document.querySelector("#out");
    const eventnameIn = document.getElementById("eventnameIn");
    const interpretIn = document.getElementById("interpretIn");
    const priceIn = document.getElementById("priceIn");
    const dateIn = document.getElementById("dateIn");
    const entryAdder = document.querySelector("#entryAdder");
    let entryArray = []; // Hier werden alle Events abgespeichert
    let entryCount = 0; // Zählt die Anzahl der Events
    // Mache nach dem Laden folgendes:
    updateOnLoad();
    entryAdder.addEventListener("click", addEntry, false);
    // Neuer Eintrag
    function addEntry() {
        let eventnameVal = null;
        let interpretVal = null;
        let priceVal = null;
        let dateVal = null;
        let inputerror = false;
        eventnameIn.setAttribute("style", "border-color: light-gray;");
        interpretIn.setAttribute("style", "border-color: light-gray;");
        priceIn.setAttribute("style", "border-color: light-gray;");
        dateIn.setAttribute("style", "border-color: light-gray;");
        try {
            // EventnameIn
            try {
                eventnameVal = document.getElementById("eventnameIn").value;
                if (eventnameVal === "") {
                    throw new Error;
                }
            }
            catch (error) {
                eventnameIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // InterpretIn
            try {
                interpretVal = document.getElementById("interpretIn").value;
                if (interpretVal === "") {
                    throw new Error;
                }
            }
            catch (error) {
                interpretIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // PriceIn
            try {
                priceVal = parseInt(document.getElementById("priceIn").value);
                if (priceVal.toString() === "NaN") {
                    throw new Error;
                }
            }
            catch (error) {
                priceIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // DateIn
            try {
                dateVal = new Date(document.getElementById("dateIn").value);
                if (dateVal.toString() === "Invalid Date") {
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
        // Erzeugen und darstellen
        display(eventnameVal, interpretVal, priceVal, dateVal);
    }
    // Erstellt die dynamischen Elemente
    function display(eventnameVal, interpretVal, priceVal, dateVal) {
        // Erzeugen eines Eintragselement mit id und Button
        let entry = document.createElement("div");
        entry.setAttribute("id", `${entryCount}`);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";
        // Erzeugen des Eintragsinhalt
        let date = document.createElement("td");
        try {
            date.textContent = `${dateVal.toISOString().substr(8, 2)}.${dateVal.toISOString().substr(5, 2)}.${dateVal.toISOString().substr(0, 4)} | ${dateVal.toISOString().substr(11, 2)}:${dateVal.toISOString().substr(14, 2)} Uhr`;
        }
        catch (error) { // Das Date-Format wird durch die JSON-Umwandlung abgewndelt und funktioniert dadurch nicht mehr gleich
            date.textContent = `${dateVal.toString().substr(8, 2)}.${dateVal.toString().substr(5, 2)}.${dateVal.toString().substr(0, 4)} | ${dateVal.toString().substr(11, 2)}:${dateVal.toString().substr(14, 2)} Uhr`;
        }
        let eventname = document.createElement("td");
        eventname.textContent = eventnameVal;
        let interpret = document.createElement("td");
        interpret.textContent = interpretVal;
        let price = document.createElement("td");
        price.textContent = `${priceVal.toString()},-`;
        // Positionieren der erzeugten Elemente
        out.appendChild(entry);
        entry.appendChild(date);
        entry.appendChild(eventname);
        entry.appendChild(interpret);
        entry.appendChild(price);
        entry.appendChild(deleteButton);
        // Dem Löschkopf eine Funktion zuweisen
        deleteButton.addEventListener("click", function () { deleteEntry(entry); });
        // Speichern als EventEntry
        let entryContent = new EventEntry(eventnameVal, interpretVal, priceVal, dateVal);
        // In den Eintragsarray hinzufügen
        entryArray[entryCount] = entryContent;
        entryCount++;
        // Den Array in den localStorage
        entryToStorage(entryArray);
    }
    // Eintrag zum localStorage
    function entryToStorage(entryArray) {
        let entryString = JSON.stringify(entryArray);
        localStorage.setItem("entriesInStorage", entryString);
        console.log(localStorage.getItem("entriesInStorage"));
    }
    // Update beim Laden
    function updateOnLoad() {
        let stringFrmStrg = localStorage.getItem("entriesInStorage");
        let entriesFrmLclStrg = JSON.parse(stringFrmStrg);
        console.log("Arrays mit dem Key 'entriesInStorage': ", entriesFrmLclStrg);
        // Update --> add Entry
        let eventnameVal = null;
        let interpretVal = null;
        let priceVal = null;
        let dateVal = null;
        try {
            while (entryCount < entriesFrmLclStrg.length) {
                // Eventname
                eventnameVal = entriesFrmLclStrg[entryCount].eventname;
                // Interpret
                interpretVal = entriesFrmLclStrg[entryCount].interpret;
                // Price
                priceVal = entriesFrmLclStrg[entryCount].price;
                // Date
                dateVal = entriesFrmLclStrg[entryCount].date;
                display(eventnameVal, interpretVal, priceVal, dateVal);
            }
        }
        catch (error) {
            console.log("Nichts im localStorage.");
        }
    }
    // Eintrag löschen
    function deleteEntry(parentElement) {
        let id = parseInt(parentElement.getAttribute("id"));
        console.log(`ID: ${id}`);
        entryArray.splice(id, 1);
        out.removeChild(parentElement);
        // Updated den localStorage
        entryToStorage(entryArray);
        console.log("Eintrag gelöscht.");
    }
})(a4 || (a4 = {}));
//# sourceMappingURL=events.js.map