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
        // EventnameIn
        try {
            eventnameVal = document.getElementById("eventnameIn").value;
            if (eventnameVal === "") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Die Eventeingabe ist leer.");
        }
        // InterpretIn
        try {
            interpretVal = document.getElementById("interpretIn").value;
            if (interpretVal === "") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Die Interpreteneingabe ist leer.");
        }
        // PriceIn
        try {
            priceVal = parseInt(document.getElementById("priceIn").value);
            if (priceVal.toString() === "NaN") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Die Preiseingabe ist leer.");
        }
        // DateIn
        try {
            dateVal = new Date(document.getElementById("dateIn").value);
            if (dateVal.toString() === "Invalid Date") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Die Termineingabe ist leer oder beinhaltet ein ungültiges Datum.");
        }
        display(eventnameVal, interpretVal, priceVal, dateVal);
    }
    // Erstellt die dynamischen Elemente
    function display(eventnameVal, interpretVal, priceVal, dateVal) {
        let entry = document.createElement("div");
        entry.setAttribute("id", `${entryCount}`);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";
        entry.textContent = eventnameVal + "; " + interpretVal + "; " + priceVal + "; " + dateVal;
        out.appendChild(entry);
        entry.appendChild(deleteButton);
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
        localStorage.setItem("entryInStorage", entryString);
        console.log(localStorage.getItem("entryInStorage"));
    }
    // Update beim Laden
    function updateOnLoad() {
        let stringFrmStrg = localStorage.getItem("entryInStorage");
        let entriesFrmLclStrg = JSON.parse(stringFrmStrg);
        console.log("Array mit dem Key 'entryInStorage': ", entriesFrmLclStrg);
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
        entryArray[id] = null;
        out.removeChild(parentElement);
        // Speichern als EventEntry
        let entryContent = new EventEntry(null, null, null, null);
        // In den Eintragsarray hinzufügen
        entryArray[id] = entryContent;
        // Den Array in den localStorage
        entryToStorage(entryArray);
        console.log("Eintrag gelöscht.");
    }
})(a4 || (a4 = {}));
//# sourceMappingURL=events.js.map