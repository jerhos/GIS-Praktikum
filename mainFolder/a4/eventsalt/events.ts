namespace a4 {
    
    class TableElement {
        eventname: string;
        interpret: string;
        price: number;
        date: Date;
    
        constructor(eventname: string, interpret: string, price: number, date: Date) {
            this.eventname = eventname;
            this.interpret = interpret;
            this.price = price;
            this.date = date;
        }
    }

    class TableElements {
        elements: TableElement[] = [];
        addElement(element: TableElement, index: number): void {
            this.elements[index] = element;
            console.log(this.elements);
        }
        readElement(index: number): TableElement {
            return this.elements[index];
        }
    }

    let elementID: number = 0;
    let adderButton: HTMLElement = document.getElementById("adderButton");
    adderButton.addEventListener("click", addElement);
    let tableElements: TableElements = new TableElements();
    
    // Neues Tabellenelement (Event) hinzufügen
    function addElement(): void {
        try {
            readForm();
        } catch (error) {
            alert(error);
        }
        eventElements();
        fillTable();
        elementID++;
    }

    // Tabellenelement entfernen
    function removeElement(): void {
        console.log("Versuche, zu löschen");
        
        let tableElement: NodeListOf<Element> = document.querySelectorAll();
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
    function eventElements(): void {
        let table: HTMLElement = document.createElement("table");
        let tbody: HTMLElement = document.createElement("tbody");
        let tableElement: HTMLElement = document.createElement("tr");
        let eventOut: HTMLElement = document.createElement("td");
        let interpretOut: HTMLElement = document.createElement("td");
        let priceOut: HTMLElement = document.createElement("td");
        let dateOut: HTMLElement = document.createElement("td");
        let del: HTMLElement = document.createElement("td");
        let delButton: HTMLElement = document.createElement("button");
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
        let out: HTMLElement = document.getElementById("out").appendChild(table);
        console.log(`id: ${elementID}`);
        out.setAttribute("elementIdOut", elementID + "");
        delButton.setAttribute("elementIdDel", elementID + "");
        out.id = elementID.toString();
    }

    // Formular auslesen
    function readForm(): void {
        let eventname: string = null;
        let interpret: string = null;
        let price: number = null;
        let date: Date = null;

        // EventnameIn
        try {
            eventname = (<HTMLInputElement>document.getElementById("eventnameIn")).value;
            if (eventname === "") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Eventeingabe ist leer.");
        }
        // InterpretIn
        try {
            interpret = (<HTMLInputElement>document.getElementById("interpretIn")).value;
            if (interpret === "") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Interpreteneingabe ist leer.");
        }
        // PriceIn
        try {
            price = parseInt((<HTMLInputElement>document.getElementById("priceIn")).value);
            if (price.toString() === "NaN") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Preiseingabe ist leer.");
        }
        // DateIn
        try {
            date = new Date((<HTMLInputElement>document.getElementById("dateIn")).value);
            if (date.toString() === "Invalid Date") {
                throw new Error;
            }
        } catch (error) {
           throw new Error("Die Termineingabe ist leer.");
        }
        
        // Kontrolle Input
        console.log(`>>>Input<<<\n${eventname}\n${interpret}\n${price}\n${date}`);
        // Neues Tabellenelement erzeugen
        let divElement: HTMLDivElement = document.createElement("div");
        //let tableElement: TableElement = new TableElement(eventname, interpret, price, date);
        // Zum Array hinzufügen
        //tableElements.addElement(tableElement, elementID);
    }

    // Grafisches Erzeugen des Tabellenelements
    function fillTable(): void {
        let tableElement: HTMLElement = document.getElementById(elementID.toString());
        console.log(tableElement);
        let eventnameOut: HTMLCollectionOf<Element> = tableElement.getElementsByClassName("eventname");
        let interpretOut: HTMLCollectionOf<Element> = tableElement.getElementsByClassName("interpret");
        let priceOut: HTMLCollectionOf<Element> = tableElement.getElementsByClassName("price");
        let dateOut: HTMLCollectionOf<Element> = tableElement.getElementsByClassName("date");
        eventnameOut.item(0).textContent = tableElements.readElement(elementID).eventname;
        interpretOut.item(0).textContent = tableElements.readElement(elementID).interpret;
        priceOut.item(0).textContent = (tableElements.readElement(elementID).price).toString();
        dateOut.item(0).textContent = (tableElements.readElement(elementID).date).toTimeString();
    }
}