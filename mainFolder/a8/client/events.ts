namespace a8 {
    
    interface Event {
        _id: number;
        nameVal: string;
        interpretVal: string;
        priceVal: number;
        dateVal: Date;
    }

    const url: string ="http://127.0.0.1:2222";
    const path : string = "/concertEvents";
    const path_del : string = "/deleteEntry";
    
    const out: HTMLElement = <HTMLElement>document.querySelector("#out");
    const eventnameIn: HTMLInputElement = <HTMLInputElement>document.getElementById("eventnameIn");
    const interpretIn: HTMLInputElement = <HTMLInputElement>document.getElementById("interpretIn"); 
    const priceIn: HTMLInputElement = <HTMLInputElement>document.getElementById("priceIn"); 
    const dateIn: HTMLInputElement = <HTMLInputElement>document.getElementById("dateIn"); 
    const entryAdder: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#entryAdder");
    let entryCount: number = 0;
    
    // Mache nach dem Seitenaufruf folgendes:
    loadEntries();
    entryAdder.addEventListener("click", addEntry, false);
    
    // Neuer Eintrag
    function addEntry(): void {
        
        let _id: number = entryCount;
        let nameVal: string;
        let interpretVal: string;
        let priceVal: number;
        let dateVal: Date;
        let inputerror: boolean = false;

        let event: Event = {
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
                event.nameVal = (<HTMLInputElement>document.getElementById("eventnameIn")).value;
                if (event.nameVal === "") {
                throw new Error;
                }
            } catch (error) {
                eventnameIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // InterpretIn
            try {
                event.interpretVal = (<HTMLInputElement>document.getElementById("interpretIn")).value;
                if (event.interpretVal === "") {
                throw new Error;
                }
            } catch (error) {
                interpretIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // PriceIn
            try {
                event.priceVal = parseInt((<HTMLInputElement>document.getElementById("priceIn")).value);
                if (event.priceVal.toString() === "NaN") {
                throw new Error;
                }
            } catch (error) {
                priceIn.setAttribute("style", "border-color: red;");
                inputerror = true;
            }
            // DateIn
            try {
                event.dateVal = new Date((<HTMLInputElement>document.getElementById("dateIn")).value);
                if (event.dateVal.toString() === "Invalid Date") {
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
        
        display(event);
        saveEntry(event);
    }

    // Erstellt die dynamischen Elemente
    function display(event: Event): void {        
        // Erzeugen eines Eintragselement mit id und Button
        let entry: HTMLDivElement = document.createElement("div");
        entry.setAttribute("id", `${entryCount}`);
        let deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";
         // Erzeugen des Eintragsinhalt
        let date: HTMLElement = document.createElement("td");
        try {
            date.textContent = `${event.dateVal.toISOString().substring(8, 10)}.${event.dateVal.toISOString().substring(5, 7)}.${event.dateVal.toISOString().substring(0, 4)} | ${event.dateVal.toISOString().substring(11, 13)}:${event.dateVal.toISOString().substring(14, 16)} Uhr`;
        } catch (error) { // Das Date-Format wird durch die JSON-Umwandlung abgewndelt und funktioniert dadurch nicht mehr gleich
            date.textContent = `${event.dateVal.toString().substring(8, 10)}.${event.dateVal.toString().substring(5, 7)}.${event.dateVal.toString().substring(0, 4)} | ${event.dateVal.toString().substring(11, 13)}:${event.dateVal.toString().substring(14, 16)} Uhr`;
        }
        let eventname: HTMLElement = document.createElement("td");
        eventname.textContent = event.nameVal;
        let interpret: HTMLElement = document.createElement("td");
        interpret.textContent = event.interpretVal;
        let price: HTMLElement = document.createElement("td");
        price.textContent = `${event.priceVal.toString()},-`;

        // Positionieren der erzeugten Elemente
        out.appendChild(entry);
        entry.appendChild(date);
        entry.appendChild(eventname);
        entry.appendChild(interpret);
        entry.appendChild(price);
        entry.appendChild(deleteButton);
        // Dem Löschkopf eine Funktion zuweisen
        deleteButton.addEventListener("click", function(): void {deleteEntry(entry); });
        entryCount++;
    }

    // Eintrag löschen
    async function deleteEntry(parentElement: HTMLDivElement): Promise<void> {
        let _id: number = parseInt((<HTMLElement>parentElement).getAttribute("id"));
        out.removeChild(parentElement);
        let delPara: string = "?delete=" + _id;
        await fetch(url + path_del + delPara, {
            method: "get",
        });
        loadEntries();
        console.log(`Entry with id ${_id} deleted.`);
    }

    // Sendet einen POST-Befehl
    async function saveEntry(event: Event): Promise<void> {
        let eventstring: string = JSON.stringify(event);
        console.log("Saving in database:");
        console.log(eventstring);
        await fetch(url + path, {
            method: "post",
            body: eventstring
        });
    }
    
    // Sendet einen GET-Request
    async function loadEntries(): Promise<void> {
        let response = await fetch(url + path, {method: "get"});
        let responseText = await response.text();
        let responseEvents: Event[] = JSON.parse(responseText);
        console.log(`Found existing events:`);
        console.log(responseEvents);
        try {
            while (entryCount < responseEvents.length) {
                display(responseEvents[entryCount]);
            }
        } catch (error) {
           console.log("Nichts in der Datenbank."); 
        }
    }
}