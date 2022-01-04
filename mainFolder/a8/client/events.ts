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
    
    const out: HTMLElement = <HTMLElement>document.querySelector("#out");
    const eventnameIn: HTMLInputElement = <HTMLInputElement>document.getElementById("eventnameIn");
    const interpretIn: HTMLInputElement = <HTMLInputElement>document.getElementById("interpretIn"); 
    const priceIn: HTMLInputElement = <HTMLInputElement>document.getElementById("priceIn"); 
    const dateIn: HTMLInputElement = <HTMLInputElement>document.getElementById("dateIn"); 
    const entryAdder: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#entryAdder");
    let entryCount: number = 0;
    
    // Mache nach dem Laden folgendes:
    updateOnLoad();
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
        date.textContent = `${event.dateVal.toLocaleDateString()} | ${event.dateVal.toLocaleTimeString()} Uhr`;
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
    function deleteEntry(parentElement: HTMLDivElement): void {
        console.log("Eintrag gelöscht.");
        out.removeChild(parentElement);
    }

    // Sendet einen POST-Befehl
    async function saveEntry(event: Event): Promise<void> {
        let eventstring: string = JSON.stringify(event);
        console.log("Attempting to save in database:");
        console.log(eventstring);
        await fetch(url + path, {
            method: "post",
            body: eventstring
        });
    }
    
    // Sendet einen GET-Request
    async function updateOnLoad(): Promise<void> {
        let response = await fetch(url + path, {method: "get"});
        let responseText = await response.text();
        console.log(responseText);

        // Setze entryCount auf _id+1, danit nichts überschrieben wird
        //entryCount = event._id;
    }
}