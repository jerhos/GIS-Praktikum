"use strict";
var a4;
(function (a4) {
    class TableElement {
        eventname;
        interpret;
        price;
        date;
        constructor(eventname, interpret, price, date) {
            this.eventname = eventname;
            this.interpret = interpret;
            this.price = price;
            this.date = date;
        }
    }
    class TableElements {
        elements = [];
        addElement(element, index) {
            this.elements[index] = element;
            console.log(this.elements);
        }
        readElement(index) {
            return this.elements[index];
        }
    }
    let elementID = 0;
    let adderButton = document.getElementById("adderButton");
    adderButton.addEventListener("click", addElement);
    let tableElements = new TableElements();
    // Neues Tabellenelement (Event) hinzufügen
    function addElement() {
        try {
            readForm();
        }
        catch (error) {
            alert(error);
        }
        eventElements();
        fillTable();
        elementID++;
    }
    // Tabellenelement entfernen
    function removeElement() {
        console.log("Versuche, zu löschen");
        let tableElement = document.querySelectorAll();
        /*
         let eventID: string = (<HTMLElement>event.target).dataset.elementID;
         let dataEvent: string = "[data-tableElement-elementid]";
         let tableElement: NodeListOf<Element> = document.querySelectorAll(dataEvent);
 
         tableElement.forEach(element => {
             if (element.getAttribute("data-tableElement-elementID") == eventID) {
                 element.remove();
                 console.log(element + " mit Tag: =" + eventID + " wurde entfernt.");
 
                 tableElements.readElement(parseInt(eventID)) === null;
             }
         }
     );*/
    }
    // Neue Tabellenreihe hinzufügen
    function eventElements() {
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let tableElement = document.createElement("tr");
        let eventOut = document.createElement("td");
        let interpretOut = document.createElement("td");
        let priceOut = document.createElement("td");
        let dateOut = document.createElement("td");
        let del = document.createElement("td");
        let delButton = document.createElement("button");
        // Add
        tableElement.classList.add("tableElement");
        eventOut.classList.add("eventname");
        interpretOut.classList.add("interpret");
        priceOut.classList.add("price");
        dateOut.classList.add("date");
        del.classList.add("del");
        delButton.classList.add("delButton");
        delButton.innerText = "ⓧ";
        delButton.setAttribute("type", "button");
        // Append
        tableElement.appendChild(eventOut);
        tableElement.appendChild(interpretOut);
        tableElement.appendChild(priceOut);
        tableElement.appendChild(dateOut);
        del.appendChild(delButton);
        tableElement.appendChild(del);
        tbody.appendChild(tableElement);
        table.appendChild(tbody);
        // Eventlistener für den Löschknopf
        delButton.addEventListener("click", removeElement, false);
        // Output
        let out = document.getElementById("out").appendChild(table);
        console.log(`id: ${elementID}`);
        out.setAttribute("elementIdOut", elementID + "");
        delButton.setAttribute("elementIdDel", elementID + "");
        out.id = elementID.toString();
    }
    // Formular auslesen
    function readForm() {
        let eventname = null;
        let interpret = null;
        let price = null;
        let date = null;
        // EventnameIn
        try {
            eventname = document.getElementById("eventnameIn").value;
            if (eventname === "") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Die Eventeingabe ist leer.");
        }
        // InterpretIn
        try {
            interpret = document.getElementById("interpretIn").value;
            if (interpret === "") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Die Interpreteneingabe ist leer.");
        }
        // PriceIn
        try {
            price = parseInt(document.getElementById("priceIn").value);
            if (price.toString() === "NaN") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Die Preiseingabe ist leer.");
        }
        // DateIn
        try {
            date = new Date(document.getElementById("dateIn").value);
            if (date.toString() === "Invalid Date") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Die Termineingabe ist leer.");
        }
        // Kontrolle Input
        console.log(`>>>Input<<<\n${eventname}\n${interpret}\n${price}\n${date}`);
        // Neues Tabellenelement erzeugen
        //let tableElement: HTMLDivElement = document.createElement("div");
        let tableElement = new TableElement(eventname, interpret, price, date);
        // Zum Array hinzufügen
        tableElements.addElement(tableElement, elementID);
    }
    // Grafisches Erzeugen des Tabellenelements
    function fillTable() {
        let tableElement = document.getElementById(elementID.toString());
        console.log(tableElement);
        let eventnameOut = tableElement.getElementsByClassName("eventname");
        let interpretOut = tableElement.getElementsByClassName("interpret");
        let priceOut = tableElement.getElementsByClassName("price");
        let dateOut = tableElement.getElementsByClassName("date");
        eventnameOut.item(0).textContent = tableElements.readElement(elementID).eventname;
        interpretOut.item(0).textContent = tableElements.readElement(elementID).interpret;
        priceOut.item(0).textContent = (tableElements.readElement(elementID).price).toString();
        dateOut.item(0).textContent = (tableElements.readElement(elementID).date).toTimeString();
    }
})(a4 || (a4 = {}));
//# sourceMappingURL=events.js.map