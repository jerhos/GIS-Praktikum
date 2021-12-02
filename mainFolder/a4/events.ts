namespace a4 {
 
    const out: HTMLElement = <HTMLElement>document.querySelector("#out");
    const eventnameIn: HTMLInputElement = <HTMLInputElement>document.getElementById("eventnameIn");
    const interpretIn: HTMLInputElement = <HTMLInputElement>document.getElementById("interpretIn"); 
    const priceIn: HTMLInputElement = <HTMLInputElement>document.getElementById("priceIn"); 
    const dateIn: HTMLInputElement = <HTMLInputElement>document.getElementById("dateIn"); 
    const entryAdder: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#entryAdder");
    let entryCount: number = 0;
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
        date.textContent = `${dateVal.toLocaleDateString()} | ${dateVal.toLocaleTimeString()} Uhr`;
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
        entryCount++;
    }

    // Eintrag löschen
    function deleteEntry(parentElement: HTMLDivElement): void {
        console.log("Eintrag gelöscht.");
        out.removeChild(parentElement);
    }
}