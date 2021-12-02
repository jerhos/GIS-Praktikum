namespace a4 {
 
    // Tabelleneintrag
    class EventEntry {
        eventname: string;
        interpret: string;
        price: number;
        date: Date;

        constructor (e: string, i: string, p: number, d: Date) {
            this.eventname = e;
            this.interpret = i;
            this.price = p;
            this.date = d;
        }
    }

    // Variablen und so
    const out: HTMLElement = <HTMLElement>document.querySelector("#out");
    const eventnameIn: HTMLInputElement = <HTMLInputElement>document.getElementById("eventnameIn");
    const interpretIn: HTMLInputElement = <HTMLInputElement>document.getElementById("interpretIn"); 
    const priceIn: HTMLInputElement = <HTMLInputElement>document.getElementById("priceIn"); 
    const dateIn: HTMLInputElement = <HTMLInputElement>document.getElementById("dateIn");
    const entryAdder: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#entryAdder");
    let entryArray: EventEntry[] = [];                                                                // Hier werden alle Events abgespeichert
    let entryCount: number = 0;                                                                       // Zählt die Anzahl der Events
    
    // Mache nach dem Laden folgendes:
    updateOnLoad();
    entryAdder.addEventListener("click", addEntry, false);

    // Neuer Eintrag
    function addEntry(): void {
       
        let eventnameVal: string = null;
        let interpretVal: string = null;
        let priceVal: number = null;
        let dateVal: Date = null;
        let inputerror: boolean  = false;
       
        eventnameIn.setAttribute("style", "border-color: light-gray;");
        interpretIn.setAttribute("style", "border-color: light-gray;");
        priceIn.setAttribute("style", "border-color: light-gray;");
        dateIn.setAttribute("style", "border-color: light-gray;");

        try {           
            // EventnameIn
            try {
                eventnameVal = (<HTMLInputElement>document.getElementById("eventnameIn")).value;
                if (eventnameVal === "") {
                throw new Error;
                }
            } catch (error) {
                eventnameIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // InterpretIn
            try {
                interpretVal = (<HTMLInputElement>document.getElementById("interpretIn")).value;
                if (interpretVal === "") {
                throw new Error;
                }
            } catch (error) {
                interpretIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // PriceIn
            try {
                priceVal = parseInt((<HTMLInputElement>document.getElementById("priceIn")).value);
                if (priceVal.toString() === "NaN") {
                throw new Error;
                }
            } catch (error) {
                priceIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // DateIn
            try {
                dateVal = new Date((<HTMLInputElement>document.getElementById("dateIn")).value);
                if (dateVal.toString() === "Invalid Date") {
                throw new Error;
                }
            } catch (error) {
                dateIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // Falls ein oder mehrere Eingabefehler vorhanden sind
            if (inputerror) {
                throw new Error;
            }   
        } catch (error) {
          throw new Error("FEHLER BEI DER EINGABE");  
        }
        
        // Erzeugen und darstellen
        display(eventnameVal, interpretVal, priceVal, dateVal);
    }

    // Erstellt die dynamischen Elemente
    function display(eventnameVal: string, interpretVal: string, priceVal: number, dateVal: Date): void {
        
        // Erzeugen eines Eintragselement mit id und Button
        let entry: HTMLDivElement = document.createElement("div");
        entry.setAttribute("id", `${entryCount}`);
        let deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";
         // Erzeugen des Eintragsinhalt
        let date: HTMLElement = document.createElement("td");
        try {
            date.textContent = `${dateVal.toISOString().substr(8, 2)}.${dateVal.toISOString().substr(5, 2)}.${dateVal.toISOString().substr(0, 4)} | ${dateVal.toISOString().substr(11, 2)}:${dateVal.toISOString().substr(14, 2)} Uhr`;
        } catch (error) { // Das Date-Format wird durch die JSON-Umwandlung abgewndelt und funktioniert dadurch nicht mehr gleich
            date.textContent = `${dateVal.toString().substr(8, 2)}.${dateVal.toString().substr(5, 2)}.${dateVal.toString().substr(0, 4)} | ${dateVal.toString().substr(11, 2)}:${dateVal.toString().substr(14, 2)} Uhr`;
        }
        let eventname: HTMLElement = document.createElement("td");
        eventname.textContent = eventnameVal;
        let interpret: HTMLElement = document.createElement("td");
        interpret.textContent = interpretVal;
        let price: HTMLElement = document.createElement("td");
        price.textContent = `${priceVal.toString()},-`;

        // Positionieren der erzeugten Elemente
        out.appendChild(entry);
        entry.appendChild(date);
        entry.appendChild(eventname);
        entry.appendChild(interpret);
        entry.appendChild(price);
        entry.appendChild(deleteButton);
        // Dem Löschkopf eine Funktion zuweisen
        deleteButton.addEventListener("click", function(): void {deleteEntry(entry); });

        // Speichern als EventEntry
        let entryContent: EventEntry = new EventEntry(eventnameVal, interpretVal, priceVal, dateVal);
        // In den Eintragsarray hinzufügen
        entryArray[entryCount] = entryContent;
        entryCount++;
        // Den Array in den localStorage
        entryToStorage(entryArray);
    }

    // Eintrag zum localStorage
    function entryToStorage(entryArray: EventEntry[]): void {
        let entryString: string = JSON.stringify(entryArray);
        localStorage.setItem("entriesInStorage", entryString);
        console.log(localStorage.getItem("entriesInStorage"));
    }

    // Update beim Laden
    function updateOnLoad(): void {
        let stringFrmStrg: string = localStorage.getItem("entriesInStorage");
        let entriesFrmLclStrg: EventEntry[] = JSON.parse(stringFrmStrg);
        console.log("Arrays mit dem Key 'entriesInStorage': ", entriesFrmLclStrg);

        // Update --> add Entry
        let eventnameVal: string = null;
        let interpretVal: string = null;
        let priceVal: number = null;
        let dateVal: Date = null;

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
        } catch (error) {
           console.log("Nichts im localStorage."); 
        }         
    }

    // Eintrag löschen
    function deleteEntry(parentElement: HTMLDivElement): void {
        let id: number = parseInt((<HTMLElement>parentElement).getAttribute("id"));
        console.log(`ID: ${id}`);
        entryArray.splice(id, 1);
        out.removeChild(parentElement);
        // Updated den localStorage
        entryToStorage(entryArray);

        console.log("Eintrag gelöscht.");
    }
}