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
        let eventnameVal = eventnameIn.value;
        let interpretVal = interpretIn.value;
        let priceVal = Number(priceIn.value);
        let dateVal = new Date(dateIn.value);
        let entry = document.createElement("div");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";
        entry.textContent = eventnameVal + "; " + interpretVal + "; " + priceVal + "; " + dateVal;
        out.appendChild(entry);
        entry.appendChild(deleteButton); //füge den Delete Button als Kindelement dem neu erstellten Element "newElement" hinzu
        // Eventlistener für den Deletebutton
        deleteButton.addEventListener("click", function () {
            deleteEvent(entry); //Übergeben wird als Parameter das Element, welches später gelöscht werden soll.
        });
    }
    // Eventlistener für die Delete-Buttons
    function deleteEvent(parentElement) {
        console.log("deleteEvent wurde aufgerufen!"); // Konsolenausgabe zum Testen des Funktionsaufrufes
        out.removeChild(parentElement); //Lösche das als Parameter übergebene Element aus dem Elter-Element "display"
    }
})(a4 || (a4 = {}));
//# sourceMappingURL=events.js.map