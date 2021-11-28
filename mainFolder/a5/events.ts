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
 
        // EventnameIn
        try {
            eventnameVal = (<HTMLInputElement>document.getElementById("eventnameIn")).value;
            if (eventnameVal === "") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Eventeingabe ist leer.");
        }
        // InterpretIn
        try {
            interpretVal = (<HTMLInputElement>document.getElementById("interpretIn")).value;
            if (interpretVal === "") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Interpreteneingabe ist leer.");
        }
        // PriceIn
        try {
            priceVal = parseInt((<HTMLInputElement>document.getElementById("priceIn")).value);
            if (priceVal.toString() === "NaN") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Preiseingabe ist leer.");
        }
        // DateIn
        try {
            dateVal = new Date((<HTMLInputElement>document.getElementById("dateIn")).value);
            if (dateVal.toString() === "Invalid Date") {
                throw new Error;
            }
        } catch (error) {
           throw new Error("Die Termineingabe ist leer oder beinhaltet ein ungültiges Datum.");
        }
        
        display(eventnameVal, interpretVal, priceVal, dateVal);
    }

    // Erstellt die dynamischen Elemente
    function display(eventnameVal: string, interpretVal: string, priceVal: number, dateVal: Date): void {
        
        let entry: HTMLDivElement = document.createElement("div");
        entry.setAttribute("id", `${entryCount}`);
        let deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";

        entry.textContent = eventnameVal + "; " + interpretVal + "; " + priceVal + "; " + dateVal; 

        out.appendChild(entry);
        entry.appendChild(deleteButton);
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
        localStorage.setItem("entryInStorage", entryString);
        console.log(localStorage.getItem("entryInStorage"));
    }

    // Update beim Laden
    function updateOnLoad(): void {
        let stringFrmStrg: string = localStorage.getItem("entryInStorage");
        let entriesFrmLclStrg: EventEntry[] = JSON.parse(stringFrmStrg);
        console.log("Array mit dem Key 'entryInStorage': ", entriesFrmLclStrg);

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
        entryArray[id] = null;
        out.removeChild(parentElement);
        
        // Speichern als EventEntry
        let entryContent: EventEntry = new EventEntry(null, null, null, null);
        // In den Eintragsarray hinzufügen
        entryArray[id] = entryContent;
        // Den Array in den localStorage
        entryToStorage(entryArray);

        console.log("Eintrag gelöscht.");
    }
}