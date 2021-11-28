"use strict";
var a4;
(function (a4) {
    const out = document.querySelector("#out");
    const eventnameIn = document.getElementById("eventnameIn");
    const interpretIn = document.getElementById("interpretIn");
    const priceIn = document.getElementById("priceIn");
    const dateIn = document.getElementById("dateIn");
    const entryAdder = document.querySelector("#entryAdder");
    entryAdder.addEventListener("click", addEntry, false);
    // Kontrolle
    console.log(eventnameIn);
    console.log(interpretIn);
    console.log(priceIn);
    console.log(dateIn);
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
            throw new Error("Die Termineingabe ist leer oder ungültiges Datum.");
        }
        let entry = document.createElement("div");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";
        entry.textContent = eventnameVal + "; " + interpretVal + "; " + priceVal + "; " + dateVal;
        out.appendChild(entry);
        entry.appendChild(deleteButton);
        deleteButton.addEventListener("click", function () { deleteEntry(entry); });
    }
    // Eintrag löschen
    function deleteEntry(parentElement) {
        console.log("Eintrag gelöscht.");
        out.removeChild(parentElement);
    }
})(a4 || (a4 = {}));
//# sourceMappingURL=events.js.map