"use strict";
var a4;
(function (a4) {
    const out = document.querySelector("#out");
    const eventnameIn = document.getElementById("eventnameIn");
    const interpretIn = document.getElementById("interpretIn");
    const priceIn = document.getElementById("priceIn");
    const dateIn = document.getElementById("dateIn");
    const entryAdder = document.querySelector("#entryAdder");
    let entryCount = 0;
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
        date.textContent = `${dateVal.toLocaleDateString()} | ${dateVal.toLocaleTimeString()} Uhr`;
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
        entryCount++;
    }
    // Eintrag löschen
    function deleteEntry(parentElement) {
        console.log("Eintrag gelöscht.");
        out.removeChild(parentElement);
    }
})(a4 || (a4 = {}));
//# sourceMappingURL=events.js.map